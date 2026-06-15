
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useAdminStats,
  useAdminReports,
  useAdminUsers,
  useResolveReport,
  useRemovePost,
  useBanUser,
  useUnbanUser
} from "@/hooks/useAdmin";
import {
  LayoutDashboard,
  AlertCircle,
  Users,
  Trash2,
  CheckCircle2,
  XCircle,
  MessageSquare,
  FileText,
  ArrowDownUp
} from "lucide-react";
import { format } from "date-fns";

export default function AdminPage() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: reports, isLoading: reportsLoading } = useAdminReports();
  const { data: users, isLoading: usersLoading } = useAdminUsers();

  const resolveReportMutation = useResolveReport();
  const removePostMutation = useRemovePost();
  const banUserMutation = useBanUser();
  const unbanUserMutation = useUnbanUser();

  if (statsLoading || reportsLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5CF6]"></div>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-heading text-[#F5F5F5] flex items-center gap-2">
          <LayoutDashboard size={24} className="text-[#8B5CF6]" />
          Platform Dashboard
        </h1>
        <p className="text-[#999999] mt-1 text-sm">System-wide monitoring and moderation tools.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats?.users, icon: Users, color: "text-text-aliaslue-400" },
          { label: "Total Posts", value: stats?.posts, icon: FileText, color: "text-purple-400" },
          { label: "Total Comments", value: stats?.comments, icon: MessageSquare, color: "text-pink-400" },
          { label: "Pending Reports", value: stats?.reports, icon: AlertCircle, color: "text-amber-400" },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#111111] border-[#1F1F2E] overflow-hidden group hover:border-[#8B5CF6]/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#999999] text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-heading text-[#F5F5F5] mt-1">{stat.value?.toLocaleString() || 0}</p>
                </div>
                <div className={`p-2.5 rounded-xl bg-[#1A1A1A] ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={22} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="bg-[#111111] border-[#1F1F2E] p-1 h-auto self-start">
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-[#F5F5F5] py-2 px-6 rounded-lg text-[#999999] transition-all"
          >
            Moderate Reports
            {stats?.reports > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-[#8B5CF6] text-white text-[10px] rounded-full">
                {stats.reports}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-[#F5F5F5] py-2 px-6 rounded-lg text-[#999999] transition-all"
          >
            User Management
          </TabsTrigger>
        </TabsList>

        {/* Reports Content */}
        <TabsContent value="reports" className="mt-6">
          <Card className="bg-[#111111] border-[#1F1F2E]">
            <CardHeader className="border-b border-[#1F1F2E] py-4">
              <CardTitle className="text-sm font-medium text-[#F5F5F5] flex items-center gap-2">
                <ArrowDownUp size={18} className="text-[#8B5CF6]" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[#6C6C89] text-xs uppercase border-b border-[#1F1F2E]">
                      <th className="px-6 py-4 font-semibold">Reported Post</th>
                      <th className="px-6 py-4 font-semibold">Reason</th>
                      <th className="px-6 py-4 font-semibold">Reported By</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F2E]">
                    {reports?.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-[#6C6C89] italic">
                          No pending reports found.
                        </td>
                      </tr>
                    ) : (
                      reports?.map((report: any) => (
                        <tr key={report._id} className="hover:bg-[#1A1A1A]/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="max-w-xs">
                              <p className="text-[#F5F5F5] text-sm line-clamp-2">
                                {report.postId?.content || "Deleted Post"}
                              </p>
                              {report.postId && (
                                <p className="text-xs text-[#6C6C89] mt-1">ID: ...{report.postId._id.slice(-6)}</p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded bg-[#2A2A2A] text-[#F5F5F5] text-[10px] font-medium uppercase">
                              {report.reason}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-[#F5F5F5] text-sm">{report.reportedById?.alias || "Unknown"}</span>
                              <span className="text-[#6C6C89] text-xs">{report.reportedById?.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#999999] text-sm">
                            {format(new Date(report.createdAt), "MMM d, HH:mm")}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                title="Approve (Dismiss)"
                                disabled={resolveReportMutation.isPending}
                                onClick={() => resolveReportMutation.mutate(report._id)}
                                className="h-8 w-8 p-0 text-primarymerald-400 hover:text-primarymerald-300 hover:bg-primarymerald-400/10"
                              >
                                <CheckCircle2 size={18} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                title="Remove Post"
                                disabled={removePostMutation.isPending}
                                onClick={() => {
                                  if (confirm("Are you sure you want to remove this post?")) {
                                    removePostMutation.mutate(report.postId?._id)
                                  }
                                }}
                                className="h-8 w-8 p-0 text-rose-400 hover:text-rose-300 hover:bg-rose-400/10"
                              >
                                <Trash2 size={18} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Content */}
        <TabsContent value="users" className="mt-6">
          <Card className="bg-[#111111] border-[#1F1F2E]">
            <CardHeader className="border-b border-[#1F1F2E] py-4">
              <CardTitle className="text-sm font-medium text-[#F5F5F5] flex items-center gap-2">
                <Users size={18} className="text-[#8B5CF6]" />
                Platform Users
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[#6C6C89] text-xs uppercase border-b border-[#1F1F2E]">
                      <th className="px-6 py-4 font-semibold">User</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Joined</th>
                      <th className="px-6 py-4 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F2E]">
                    {users?.map((user: any) => (
                      <tr key={user._id} className="hover:bg-[#1A1A1A]/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#8B5CF6] text-xs font-heading ring-2 ring-[#1F1F2E]">
                              {user.alias?.[0]?.toUpperCase() || "U"}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[#F5F5F5] text-sm font-medium">{user.alias}</span>
                              <span className="text-[#6C6C89] text-xs">{user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-heading uppercase ${user.role === 'admin' ? 'bg-primarylevatedmber-400/10 text-amber-400' : 'bg-blue-400/10 text-text-aliaslue-400'
                            }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#999999] text-sm">
                          {format(new Date(user.createdAt), "MMM yyyy")}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {user.role !== 'admin' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={banUserMutation.isPending || unbanUserMutation.isPending}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const uId = user._id;
                                if (user.isBanned) {
                                  unbanUserMutation.mutate(uId);
                                } else {
                                  if (window.confirm(`Are you sure you want to ban ${user.alias}?`)) {
                                    banUserMutation.mutate(uId);
                                  }
                                }
                              }}
                              className={`h-8 px-3 text-xs font-medium ${user.isBanned
                                ? "text-primarymerald-400 hover:text-primarymerald-300 hover:bg-primarymerald-400/10"
                                : "text-rose-400 hover:text-rose-300 hover:bg-rose-400/10"
                                }`}
                            >
                              {user.isBanned ? (
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Unban</span>
                              ) : (
                                <span className="flex items-center gap-1.5"><XCircle size={14} /> Ban User</span>
                              )}
                            </Button>
                          )}
                          {user.role === 'admin' && (
                            <span className="text-[#6C6C89] text-xs font-medium mr-3 italic">Immune</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}