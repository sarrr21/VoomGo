import type { DocumentFile } from "../../types/approval";

interface DocumentStatusProps {
  document: DocumentFile;
  label: string;
}

export function DocumentStatus({ document }: DocumentStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="text-green-600">✅</span>;
      case "rejected":
        return <span className="text-red-600">❌</span>;
      default:
        return <span className="text-gray-400">📄</span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 border-green-200";
      case "rejected":
        return "bg-red-100 border-red-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className={`p-3 rounded-lg border ${getStatusColor(document.status)}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <span className="text-sm">📄</span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900">
            {document.name}
          </div>
          <div className="text-xs text-gray-500">
            {document.size} • {document.uploadDate}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(document.status)}
        </div>
      </div>
    </div>
  );
}
