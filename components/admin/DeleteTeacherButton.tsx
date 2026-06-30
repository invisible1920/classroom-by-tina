"use client";

export default function DeleteTeacherButton() {
  return (
    <button
      type="submit"
      onClickCapture={(event) => {
        if (
          !window.confirm(
            "Are you sure you want to permanently delete this teacher account?\n\nThis action cannot be undone.\n\nThe user's profile, login, and all associated data will be permanently removed."
          )
        ) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      className="rounded-full bg-red-50 px-4 py-2 text-xs font-black text-red-700 transition hover:bg-red-100"
    >
      Delete
    </button>
  );
}