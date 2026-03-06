'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/lib/sidebar-context';
import { Bell, Search, LogOut, User, PanelLeftOpen } from 'lucide-react';

export function Topbar() {
  const alertCount = 3;
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-white via-white to-slate-50 backdrop-blur-lg shadow-sm">
      <div className="flex h-16 items-center justify-between px-6 gap-4">
        {/* Left side - Toggle & Search */}
        <div className="flex items-center gap-3 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex hover:bg-slate-100"
            title={isOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            <PanelLeftOpen className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search patients..."
                className="pl-10 h-10 bg-gradient-to-r from-slate-100 to-slate-50 border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Right side - Alerts & User Menu */}
        <div className="flex items-center gap-4">
          {/* Alerts */}
          <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {alertCount > 0 && (
              <span className="absolute top-2 right-2 h-3 w-3 bg-gradient-to-r from-[#D1345B] to-[#E85276] rounded-full animate-pulse shadow-lg shadow-[#D1345B]/50" />
            )}
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-10 px-3 hover:bg-slate-100 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00A896] to-[#9CAF88] flex items-center justify-center text-white shadow-md">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">Dr. Sharma</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
