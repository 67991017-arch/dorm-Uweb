import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { LogIn, AlertCircle, Building2 } from 'lucide-react';
import { toast } from 'sonner';

export function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        studentId: data.studentId,
        name: 'John Doe',
        room: 'A-204',
        dormScore: 85,
      }));

      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-2xl mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="mb-2">Dormitory Portal</h1>
          <p className="text-muted-foreground">Sign in to access your account</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="studentId" className="block mb-2">Student ID</label>
              <input
                id="studentId"
                type="text"
                {...register('studentId', { required: 'Student ID is required' })}
                className="w-full px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your student ID"
                disabled={isLoading}
              />
              {errors.studentId && (
                <div className="flex items-center gap-1 mt-1.5 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.studentId.message}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full px-4 py-2.5 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your password"
                disabled={isLoading}
              />
              {errors.password && (
                <div className="flex items-center gap-1 mt-1.5 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errors.password.message}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            Demo: Use any credentials to login
          </div>
        </div>
      </div>
    </div>
  );
}
