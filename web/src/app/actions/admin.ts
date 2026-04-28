"use server";

import prisma from "@/lib/prisma";

export async function getAdminStats() {
  const [totalCompanies, activeUsers, postsToday, pendingApprovals] = await Promise.all([
    prisma.company.count(),
    prisma.user.count(),
    prisma.post.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    prisma.post.count({
      where: {
        status: "PENDING_APPROVAL",
      },
    }),
  ]);

  return {
    totalCompanies,
    activeUsers,
    postsToday,
    pendingApprovals,
  };
}

export async function getRecentActivity() {
  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      company: {
        select: {
          name: true,
        },
      },
    },
  });

  return recentPosts.map((post) => ({
    id: post.id,
    company: post.company.name,
    action: post.status === "PENDING_APPROVAL" ? "Generated post" : 
            post.status === "APPROVED" ? "Approved post" :
            post.status === "POSTED" ? "Published post" : "Draft created",
    time: post.createdAt,
    status: post.status,
  }));
}

export async function getCompanies() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { posts: true }
      }
    }
  });
  
  return companies.map(company => ({
    id: company.id,
    name: company.name,
    website: company.website,
    phone: company.phone,
    postCount: company._count.posts,
    createdAt: company.createdAt,
  }));
}

export async function createCompany(formData: FormData) {
  const name = formData.get("name") as string;
  const website = formData.get("website") as string;
  const contactName = formData.get("contactName") as string;
  const contactPhone = formData.get("contactPhone") as string;
  
  if (!name || !website) {
    throw new Error("Name and website are required");
  }

  const company = await prisma.company.create({
    data: {
      name,
      website,
      phone: contactPhone || "",
    },
  });
  
  return company.id;
}
