import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-6 space-y-6 max-w-xl mx-auto">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 text-red-400">
            <ShieldAlert className="h-10 w-10 animate-bounce" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred while rendering this page. You can try refreshing the page or navigating back to the homepage.
          </p>
          {this.state.error && (
            <pre className="w-full p-4 rounded-xl border border-border/40 bg-muted/30 text-2xs text-left overflow-x-auto max-h-40 text-muted-foreground font-mono">
              {this.state.error.toString()}
            </pre>
          )}
          <div className="flex space-x-4">
            <Button 
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold px-6 py-3"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
            <Button 
              variant="outline"
              className="border border-[#2a2a2a] text-foreground hover:bg-muted rounded-xl font-semibold px-6 py-3"
              onClick={() => window.location.href = '/'}
            >
              Go Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
