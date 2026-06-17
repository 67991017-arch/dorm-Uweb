import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { User, Award, TrendingUp, Wrench, FileText, Calendar } from 'lucide-react';

export function MainDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-destructive';
  };

  const getScoreRating = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1>Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground mt-1">Here's your dormitory overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3>Profile Details</h3>
              <p className="text-sm text-muted-foreground">Your information</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Student ID</span>
              <span>{user.studentId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Name</span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Room Number</span>
              <span>{user.room}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Building</span>
              <span>Building A</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3>Dorm Score</h3>
              <p className="text-sm text-muted-foreground">Your current rating</p>
            </div>
          </div>
          <div className="text-center py-4">
            <div className={`text-5xl mb-2 ${getScoreColor(user.dormScore)}`}>
              {user.dormScore}
            </div>
            <div className="text-lg mb-3">{getScoreRating(user.dormScore)}</div>
            <div className="w-full bg-muted rounded-full h-2.5 mb-4">
              <div
                className="bg-primary h-2.5 rounded-full transition-all"
                style={{ width: `${user.dormScore}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Score is based on cleanliness inspections, rule compliance, and community participation
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3>Quick Stats</h3>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Maintenance Requests</span>
              </div>
              <span className="text-lg">3</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Documents</span>
              </div>
              <span className="text-lg">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Days Remaining</span>
              </div>
              <span className="text-lg">248</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/dashboard/maintenance"
            className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1">Maintenance</h3>
                <p className="text-sm text-muted-foreground">Submit and track requests</p>
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard/files"
            className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="mb-1">My Files</h3>
                <p className="text-sm text-muted-foreground">Manage your documents</p>
              </div>
            </div>
          </Link>

          <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="mb-1">Events</h3>
                <p className="text-sm text-muted-foreground">View upcoming activities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
