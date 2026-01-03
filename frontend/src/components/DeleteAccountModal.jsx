import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import AnimatedModal from "@/components/ui/AnimatedModal";

const DeleteAccountModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const resetState = () => {
    setCurrentPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword) return toast.error("Password is required");

    try {
      setLoading(true);
      await api.delete("/users/del-acc", { data: { currentPassword } });

      toast.success("Account deleted successfully");
      resetState();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={() => {
        resetState();
        onClose();
      }}
      title="Delete Account"
      loading={loading}>
      {/* ⚠️ Warning section */}
      <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
        <p className="font-semibold mb-1">This action is irreversible.</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Your account will be permanently deleted</li>
          <li>All uploaded PDFs and AI results will be removed</li>
          <li>This action cannot be undone</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Enter your password to confirm"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg
            focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg
            hover:bg-red-400 transition
            disabled:bg-gray-500 disabled:cursor-not-allowed">
          {loading ? "Deleting account..." : "Delete account permanently"}
        </button>
      </form>
    </AnimatedModal>
  );
};

export default DeleteAccountModal;
