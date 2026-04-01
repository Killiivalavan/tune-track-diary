import { userProfile } from "@/data/mockData";

const SettingsPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your account and preferences.</p>

      {/* Profile */}
      <section className="mt-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-3">
          Profile
        </h2>
        <div className="mt-5 flex items-center gap-5">
          <img src={userProfile.avatar} alt={userProfile.username} className="h-20 w-20 rounded-lg object-cover" />
          <div>
            <p className="text-sm font-bold">{userProfile.username}</p>
            <button className="mt-2 rounded-md border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
              Change Avatar
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label className="sonic-label">Display Name</label>
            <input
              type="text"
              defaultValue={userProfile.username}
              className="mt-1.5 w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="sonic-label">Bio</label>
            <textarea
              defaultValue={userProfile.bio}
              className="mt-1.5 w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground outline-none resize-none h-24 focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="sonic-label">Email</label>
            <input
              type="email"
              defaultValue="julian@sonic.fm"
              className="mt-1.5 w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-3">
          Preferences
        </h2>
        <div className="mt-5 flex flex-col gap-4">
          {[
            { label: "Email Notifications", desc: "Receive updates about new reviews and activity" },
            { label: "Private Profile", desc: "Only followers can see your activity and reviews" },
            { label: "Show Listening Stats", desc: "Display your listening statistics on your profile" },
          ].map((pref, i) => (
            <div key={pref.label} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="text-sm font-medium">{pref.label}</p>
                <p className="text-xs text-muted-foreground">{pref.desc}</p>
              </div>
              <button
                className={`h-6 w-11 rounded-full transition-colors ${
                  i === 2 ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-foreground transition-transform ${
                    i === 2 ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription */}
      <section className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-3">
          Subscription
        </h2>
        <div className="mt-5 rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-bold text-primary">Sonic Pro</p>
              <p className="text-xs text-muted-foreground">Active since Jan 2024</p>
            </div>
            <span className="sonic-badge bg-sonic-coral">Active</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Annual stats, genre filters, watchlist notifications, no third-party ads, and more.
          </p>
          <button className="mt-4 rounded-md border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            Manage Subscription
          </button>
        </div>
      </section>

      {/* Actions */}
      <div className="mt-10 flex gap-3 border-t border-border pt-6 pb-16">
        <button className="rounded-md bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
        <button className="rounded-md border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
