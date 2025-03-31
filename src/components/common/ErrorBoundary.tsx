import { Component, ErrorInfo, ReactNode } from "react";
import { FaBomb } from "react-icons/fa";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <div className="text-red-500 text-5xl mb-6">
              <FaBomb />
            </div>
            <h1 className="text-2xl font-bold mb-4">Ops! Algo deu errado</h1>
            <div className="bg-gray-100 p-4 rounded-md text-left mb-6 overflow-auto max-h-40">
              <pre className="text-sm text-red-600">
                {this.state.error?.toString() || "Erro desconhecido"}
              </pre>
            </div>
            <p className="text-gray-600 mb-6">
              Desculpe pelo inconveniente. Tente recarregar a página ou volte
              mais tarde.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Recarregar a página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
