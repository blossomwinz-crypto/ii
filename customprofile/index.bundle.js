// CustomProfile for Kettu/Bunny/Revenge
// Fake username, display name, and badges — local only

const { findByProps, findByStoreName } = window.bunny?.metro ?? window.vendetta?.metro ?? {};
const { after } = window.bunny?.patcher ?? window.vendetta?.patcher ?? {};
const { storage } = window.bunny?.plugin ?? window.vendetta?.plugin ?? {};
const { showToast } = window.bunny?.ui?.toasts ?? window.vendetta?.ui?.toasts ?? {};

const { React } = window.bunny?.metro?.common ?? window.vendetta?.metro?.common ?? {};
const RN = window.bunny?.metro?.common?.ReactNative ?? require?.("react-native") ?? {};
const { View, Text, Switch, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } = RN;

// ── Badge flags ──────────────────────────────────────────────────────────
const FLAG = {
    STAFF: 1, PARTNER: 2, HYPESQUAD: 4, BUG_HUNTER_1: 8,
    BRAVERY: 64, BRILLIANCE: 128, BALANCE: 256, EARLY_SUPPORTER: 512,
    BUG_HUNTER_2: 16384, DEV_VERIFIED: 131072, MOD_ALUMNI: 262144,
    ACTIVE_DEVELOPER: 4194304,
};

const BADGES = [
    { label: "Discord Staff",        flag: FLAG.STAFF,            icon: "https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png" },
    { label: "Partner",              flag: FLAG.PARTNER,          icon: "https://cdn.discordapp.com/badge-icons/3f9748e53446a137a052f3454e2de41e.png" },
    { label: "HypeSquad Events",     flag: FLAG.HYPESQUAD,        icon: "https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png" },
    { label: "Bug Hunter 1",         flag: FLAG.BUG_HUNTER_1,     icon: "https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png" },
    { label: "HypeSquad Bravery",    flag: FLAG.BRAVERY,          icon: "https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png" },
    { label: "HypeSquad Brilliance", flag: FLAG.BRILLIANCE,       icon: "https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png" },
    { label: "HypeSquad Balance",    flag: FLAG.BALANCE,          icon: "https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png" },
    { label: "Early Supporter",      flag: FLAG.EARLY_SUPPORTER,  icon: "https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png" },
    { label: "Former Moderator",     flag: FLAG.MOD_ALUMNI,       icon: "https://cdn.discordapp.com/badge-icons/fee1624003e2fee35cb398e125dc479b.png" },
    { label: "Bug Hunter 2",         flag: FLAG.BUG_HUNTER_2,     icon: "https://cdn.discordapp.com/badge-icons/848f79194d4be5ff5f81505cbd0ce1e6.png" },
    { label: "Verified Developer",   flag: FLAG.DEV_VERIFIED,     icon: "https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4967.png" },
    { label: "Active Developer",     flag: FLAG.ACTIVE_DEVELOPER, icon: "https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png" },
];

const NITRO_ICONS = [
    "https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png",
    "https://cdn.discordapp.com/badge-icons/4f33c4a9c64ce221936bd256c356f91f.png",
    "https://cdn.discordapp.com/badge-icons/4514fab914bdbfb4ad2fa23df76121a6.png",
    "https://cdn.discordapp.com/badge-icons/2895086c18d5531d499862e41d1155a6.png",
    "https://cdn.discordapp.com/badge-icons/0334688279c8359120922938dcb1d6f8.png",
    "https://cdn.discordapp.com/badge-icons/0d61871f72bb9a33a7ae568c1fb4f20a.png",
    "https://cdn.discordapp.com/badge-icons/11e2d339068b55d3a506cff34d3780f3.png",
    "https://cdn.discordapp.com/badge-icons/cd5e2cfd9d7f27a8cdcd3e8a8d5dc9f4.png",
    "https://cdn.discordapp.com/badge-icons/5b154df19c53dce2af92c9b61e6be5e2.png",
];
const NITRO_LABELS = ["Nitro","Bronze (1mo)","Silver (2mo)","Gold (3mo)","Platinum (6mo)","Diamond (12mo)","Emerald (24mo)","Ruby (36mo)","Opal (72mo)"];

const BOOST_ICONS = [
    "https://cdn.discordapp.com/badge-icons/51040c70d4f20a921ad6674ff86fc95c.png",
    "https://cdn.discordapp.com/badge-icons/0e4080d1d333bc7ad29ef6528b6f2fb7.png",
    "https://cdn.discordapp.com/badge-icons/72bed924410c304dbe3d00a6e593ff59.png",
    "https://cdn.discordapp.com/badge-icons/df199d2050d3ed4ebf84d64ae83989f8.png",
    "https://cdn.discordapp.com/badge-icons/996b3e870e8a22ce519b3a50e6bdd52f.png",
    "https://cdn.discordapp.com/badge-icons/991c9f39ee33d7537d9f408c3e53141e.png",
    "https://cdn.discordapp.com/badge-icons/cb3ae83c15e970e8f3d410bc62cb8b99.png",
    "https://cdn.discordapp.com/badge-icons/7142225d31238f6387d9f09efaa02759.png",
    "https://cdn.discordapp.com/badge-icons/ec92202290b48d0879b7413d2dde3bab.png",
];
const BOOST_LABELS = ["1 Month","2 Months","3 Months","6 Months","9 Months","12 Months","15 Months","18 Months","24 Months"];

// ── Storage helpers ───────────────────────────────────────────────────────
const DEFAULT_DATA = { enabled: false, username: "", globalName: "", badgeFlags: 0, nitroLevel: -1, boostLevel: -1, questBadge: false };

function getData() {
    try { return Object.assign({}, DEFAULT_DATA, storage.customProfile ?? {}); }
    catch { return Object.assign({}, DEFAULT_DATA); }
}
function saveData(d) {
    try { storage.customProfile = d; } catch { }
}

// ── Helpers ───────────────────────────────────────────────────────────────
function getMyId() {
    try {
        const US = findByStoreName?.("UserStore") ?? findByProps?.("getCurrentUser","getUser");
        return US?.getCurrentUser?.()?.id ?? null;
    } catch { return null; }
}

function isMe(userId) { return !!userId && userId === getMyId(); }

function buildFakeBadges(d) {
    const out = [];
    for (const b of BADGES) {
        if (d.badgeFlags & b.flag) out.push({ id: "cp_" + b.flag, description: b.label, icon: b.icon });
    }
    if (d.nitroLevel >= 0 && d.nitroLevel < NITRO_ICONS.length)
        out.push({ id: "cp_nitro", description: "Nitro — " + NITRO_LABELS[d.nitroLevel], icon: NITRO_ICONS[d.nitroLevel] });
    if (d.boostLevel >= 0 && d.boostLevel < BOOST_ICONS.length)
        out.push({ id: "cp_boost", description: "Server Booster — " + BOOST_LABELS[d.boostLevel], icon: BOOST_ICONS[d.boostLevel] });
    if (d.questBadge)
        out.push({ id: "cp_quest", description: "Completed a Quest", icon: "https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png" });
    return out;
}

// ── Patchers ──────────────────────────────────────────────────────────────
const unpatchers = [];

function applyPatches() {
    // 1. Fake username/globalName via UserStore
    try {
        const US = findByStoreName?.("UserStore") ?? findByProps?.("getCurrentUser","getUser");
        if (US?.getCurrentUser && after) {
            unpatchers.push(after("getCurrentUser", US, (_, user) => {
                if (!user) return user;
                const d = getData();
                if (!d.enabled) return user;
                const proto = Object.getPrototypeOf(user);
                const clone = Object.assign(Object.create(proto), user);
                if (d.username) clone.username = d.username;
                if (d.globalName) { clone.globalName = d.globalName; clone.displayName = d.globalName; }
                return clone;
            }));
        }
    } catch(e) { console.error("[CP] UserStore patch err:", e); }

    // 2. Fake publicFlags (badges bitmask) via UserProfileStore
    try {
        const UPS = findByProps?.("getUserProfile","getGuildMemberProfile");
        if (UPS?.getUserProfile && after) {
            unpatchers.push(after("getUserProfile", UPS, ([userId], profile) => {
                const d = getData();
                if (!d.enabled || !profile || !isMe(userId)) return profile;
                const clone = Object.assign({}, profile);
                if (d.badgeFlags !== 0) clone.publicFlags = d.badgeFlags;
                if (d.badgeFlags !== 0) clone.flags = d.badgeFlags;
                return clone;
            }));
        }
    } catch(e) { console.error("[CP] UserProfileStore patch err:", e); }

    // 3. Badge list injection — try several known module shapes
    const badgeMods = [];
    try { const m = findByProps?.("getBadges","ProfileBadge"); if (m) badgeMods.push(m); } catch {}
    try { const m = findByProps?.("getBadges"); if (m && !badgeMods.includes(m)) badgeMods.push(m); } catch {}

    for (const mod of badgeMods) {
        try {
            if (!mod.getBadges || !after) continue;
            unpatchers.push(after("getBadges", mod, ([args], badges) => {
                const userId = args?.userId ?? args?.user?.id;
                const d = getData();
                if (!d.enabled || !isMe(userId)) return badges;
                const fake = buildFakeBadges(d);
                const filtered = (badges ?? []).filter(b => {
                    const desc = (b.description ?? b.text ?? "").toLowerCase();
                    const icon = (b.icon ?? b.iconSrc ?? "").toLowerCase();
                    if (d.nitroLevel >= 0 && (desc.includes("nitro") || icon.includes("nitro"))) return false;
                    if (d.boostLevel >= 0 && (desc.includes("boost") || icon.includes("boost"))) return false;
                    for (const fb of BADGES) {
                        if (!(d.badgeFlags & fb.flag)) continue;
                        if (icon.includes(fb.icon.split("/").pop())) return false;
                    }
                    return true;
                });
                return [...filtered, ...fake];
            }));
        } catch(e) { console.error("[CP] Badge mod patch err:", e); }
    }
}

function removePatches() {
    for (const up of unpatchers) { try { up(); } catch {} }
    unpatchers.length = 0;
}

// ── Settings UI (React Native) ────────────────────────────────────────────
const S = StyleSheet?.create({
    wrap:       { flex: 1, backgroundColor: "#1e1f22" },
    inner:      { padding: 16 },
    sectionLbl: { fontSize: 11, fontWeight: "700", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 14, marginBottom: 6 },
    input:      { backgroundColor: "#111214", color: "#fff", borderRadius: 6, paddingHorizontal: 12, paddingVertical: 9, fontSize: 14, marginBottom: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
    row:        { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
    rowLbl:     { color: "#fff", fontSize: 14, flex: 1, marginRight: 10 },
    badgesWrap: { flexDirection: "row", flexWrap: "wrap", marginBottom: 4 },
    chip:       { flexDirection: "row", alignItems: "center", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 99, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", margin: 3 },
    chipOn:     { backgroundColor: "rgba(88,101,242,0.25)", borderColor: "#5865f2" },
    chipTxt:    { color: "rgba(255,255,255,0.7)", fontSize: 11 },
    chipTxtOn:  { color: "#fff", fontWeight: "700" },
    ico:        { width: 16, height: 16, marginRight: 4 },
    saveBtn:    { backgroundColor: "#5865f2", borderRadius: 8, padding: 13, alignItems: "center", marginTop: 18, marginBottom: 8 },
    saveTxt:    { color: "#fff", fontWeight: "700", fontSize: 15 },
    hint:       { color: "rgba(255,255,255,0.28)", fontSize: 11, lineHeight: 16, marginTop: 4 },
    divider:    { height: 1, backgroundColor: "rgba(255,255,255,0.07)", marginVertical: 10 },
});

function Chip({ label, icon, active, onPress }) {
    return React.createElement(TouchableOpacity, { style: [S.chip, active && S.chipOn], onPress },
        icon && React.createElement(Image, { source: { uri: icon }, style: S.ico }),
        React.createElement(Text, { style: [S.chipTxt, active && S.chipTxtOn] }, label)
    );
}

function SettingsPage() {
    const [d, setD] = React.useState(() => getData());

    const update = (key, val) => setD(prev => ({ ...prev, [key]: val }));
    const toggleFlag = flag => setD(prev => ({ ...prev, badgeFlags: prev.badgeFlags ^ flag }));
    const toggleNitro = i => setD(prev => ({ ...prev, nitroLevel: prev.nitroLevel === i ? -1 : i }));
    const toggleBoost = i => setD(prev => ({ ...prev, boostLevel: prev.boostLevel === i ? -1 : i }));

    function save() {
        saveData(d);
        removePatches();
        if (d.enabled) applyPatches();
        showToast?.("Custom Profile saved!");
    }

    const e = (...args) => React.createElement(...args);

    return e(ScrollView, { style: S.wrap },
        e(View, { style: S.inner },
            // Enable toggle
            e(View, { style: S.row },
                e(Text, { style: S.rowLbl }, "Enable Custom Profile"),
                e(Switch, { value: d.enabled, onValueChange: v => update("enabled", v),
                    trackColor: { false: "#555", true: "#5865f2" }, thumbColor: "#fff" })
            ),
            e(View, { style: S.divider }),

            // Username
            e(Text, { style: S.sectionLbl }, "Fake Username"),
            e(TextInput, { style: S.input, placeholder: "fake_username", placeholderTextColor: "rgba(255,255,255,0.25)",
                value: d.username, onChangeText: v => update("username", v), autoCapitalize: "none", autoCorrect: false }),

            // Display name
            e(Text, { style: S.sectionLbl }, "Fake Display Name"),
            e(TextInput, { style: S.input, placeholder: "Fake Name", placeholderTextColor: "rgba(255,255,255,0.25)",
                value: d.globalName, onChangeText: v => update("globalName", v), autoCorrect: false }),

            e(View, { style: S.divider }),

            // Badges
            e(Text, { style: S.sectionLbl }, "Fake Badges"),
            e(View, { style: S.badgesWrap },
                ...BADGES.map(b => e(Chip, { key: b.flag, label: b.label, icon: b.icon,
                    active: !!(d.badgeFlags & b.flag), onPress: () => toggleFlag(b.flag) }))
            ),

            // Nitro
            e(Text, { style: S.sectionLbl }, "Nitro Badge (tap to select, tap again to remove)"),
            e(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { marginBottom: 8 } },
                e(View, { style: { flexDirection: "row" } },
                    ...NITRO_ICONS.map((icon, i) => e(Chip, { key: i, label: NITRO_LABELS[i], icon,
                        active: d.nitroLevel === i, onPress: () => toggleNitro(i) }))
                )
            ),

            // Boost
            e(Text, { style: S.sectionLbl }, "Server Booster Badge"),
            e(ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: { marginBottom: 8 } },
                e(View, { style: { flexDirection: "row" } },
                    ...BOOST_ICONS.map((icon, i) => e(Chip, { key: i, label: BOOST_LABELS[i], icon,
                        active: d.boostLevel === i, onPress: () => toggleBoost(i) }))
                )
            ),

            // Quest badge
            e(View, { style: S.row },
                e(Text, { style: S.rowLbl }, "Completed a Quest badge"),
                e(Switch, { value: d.questBadge, onValueChange: v => update("questBadge", v),
                    trackColor: { false: "#555", true: "#5865f2" }, thumbColor: "#fff" })
            ),

            // Save
            e(TouchableOpacity, { style: S.saveBtn, onPress: save },
                e(Text, { style: S.saveTxt }, "Save & Apply")
            ),
            e(Text, { style: S.hint }, "All changes are local only — only you can see them.")
        )
    );
}

// ── Plugin export ─────────────────────────────────────────────────────────
module.exports = {
    onLoad() {
        const d = getData();
        if (d.enabled) applyPatches();
    },
    onUnload() {
        removePatches();
    },
    settings: SettingsPage,
};
