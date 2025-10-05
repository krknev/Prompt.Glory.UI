"use client";

export function SidebarLink({
  onClick,
  active,
  icon,
  label,
  collapsed = false,
}: {
  onClick: () => void;
  active: boolean;
  icon: string;
  label: string;
  collapsed?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center rounded-xl text-left transition-all duration-200 relative group ${
        collapsed ? "justify-center px-3 py-3" : "gap-3 px-4 py-3"
      } ${
        active
          ? "bg-primary text-white shadow-lg shadow-primary/30"
          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="font-medium">{label}</span>}
      {collapsed && (
        <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </button>
  );
}