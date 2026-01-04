import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchProfile, upsertProfile } from "@/lib/supabaseQueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Account = () => {
  const { user, session, loading, signOut } = useAuth();

  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const profileQuery = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfile(user!.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (profileQuery.data) {
      setFullName(profileQuery.data.full_name ?? "");
      setAvatarUrl(profileQuery.data.avatar_url ?? "");
    }
  }, [profileQuery.data]);

  const saveProfile = useMutation({
    mutationFn: () =>
      upsertProfile({
        id: user!.id,
        full_name: fullName.trim() || undefined,
        avatar_url: avatarUrl.trim() || undefined,
      }),
    onSuccess: () => profileQuery.refetch(),
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <p className="text-lg text-card-foreground">You are not signed in.</p>
          <Link to="/auth" className="btn-primary inline-flex justify-center">
            Go to auth page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="text-xl font-semibold text-card-foreground">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="btn-primary">
              Home
            </Link>
            <button onClick={signOut} className="btn-primary">
              Sign out
            </button>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-card-foreground mb-2">Session</h2>
          <dl className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
            <div>
              <dt className="font-medium text-card-foreground">User ID</dt>
              <dd className="break-all">{user.id}</dd>
            </div>
            <div>
              <dt className="font-medium text-card-foreground">Session expires</dt>
              <dd>{session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : "N/A"}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-card-foreground mb-3">Profile row (profiles table)</h2>
          {profileQuery.isLoading && <p className="text-muted-foreground">Loading profile...</p>}
          {profileQuery.error && (
            <p className="text-destructive">Error: {(profileQuery.error as Error).message}</p>
          )}
          {!profileQuery.isLoading && !profileQuery.error && (
            <div className="space-y-2 text-sm text-card-foreground">
              <div>
                <span className="font-medium">full_name:</span> {profileQuery.data?.full_name ?? "(null)"}
              </div>
              <div>
                <span className="font-medium">avatar_url:</span> {profileQuery.data?.avatar_url ?? "(null)"}
              </div>
              <div>
                <span className="font-medium">updated_at:</span> {profileQuery.data?.updated_at ?? "(null)"}
              </div>
            </div>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            This reads from the `profiles` table by `user.id`. If you see nulls, insert/update a row for this user.
          </p>
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile.mutate();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">Full name</label>
              <input
                className="input-field"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                disabled={saveProfile.isPending}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">Avatar URL</label>
              <input
                className="input-field"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                disabled={saveProfile.isPending}
              />
            </div>
            <div className="flex items-center gap-3 text-sm">
              <button type="submit" className="btn-primary" disabled={saveProfile.isPending}>
                {saveProfile.isPending ? "Saving..." : "Save profile"}
              </button>
              {saveProfile.error && (
                <span className="text-destructive">{(saveProfile.error as Error).message}</span>
              )}
              {saveProfile.isSuccess && !saveProfile.error && (
                <span className="text-emerald-600">Saved</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
