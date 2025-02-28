import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import UserMenu from "@/components/UserMenu";
import { UploadFileSection } from "@/components/UploadFileSection";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-secondary-dark flex flex-col">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Bienvenido, {session.user?.name}
              </h1>
            </div>
            <UserMenu userName={session.user?.name} />
          </div>
        </div>
      </nav>
      <main className="flex flex-1 w-full">
        <UploadFileSection />
      </main>
    </div>
  );
}
