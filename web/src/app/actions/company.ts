"use server";

import prisma from "@/lib/prisma";

export async function getCompanyOverview(companyId: string) {
  // If no company exists yet (empty DB), we shouldn't crash
  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  if (!company) return null;

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [postsThisMonth, engagementStats, scheduledPosts] = await Promise.all([
    prisma.post.count({
      where: {
        companyId,
        createdAt: { gte: startOfMonth },
      },
    }),
    prisma.post.aggregate({
      where: { companyId, status: "POSTED" },
      _sum: {
        likes: true,
        comments: true,
        shares: true,
      },
    }),
    prisma.post.count({
      where: {
        companyId,
        status: "APPROVED",
        scheduledAt: { gte: new Date() },
      },
    }),
  ]);

  const totalEngagement = 
    (engagementStats._sum.likes || 0) + 
    (engagementStats._sum.comments || 0) + 
    (engagementStats._sum.shares || 0);

  return {
    companyName: company.name,
    postsThisMonth,
    totalEngagement,
    scheduledPosts,
  };
}

export async function getPromotions(companyId: string) {
  const promotions = await prisma.promotion.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
  });

  return promotions.map(promo => {
    const now = new Date();
    let status = "ACTIVE";
    
    if (promo.validUntil && new Date(promo.validUntil) < now) {
      status = "EXPIRED";
    }

    return {
      id: promo.id,
      title: promo.title,
      description: promo.description,
      validUntil: promo.validUntil,
      status,
    };
  });
}

export async function createPromotion(companyId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  
  if (!title || !description) {
    throw new Error("Title and description are required");
  }

  const promotion = await prisma.promotion.create({
    data: {
      companyId,
      title,
      description,
      validUntil: endDateStr ? new Date(endDateStr) : null,
    },
  });
  
  return promotion.id;
}
