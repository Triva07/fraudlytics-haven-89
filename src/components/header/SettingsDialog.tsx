
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Moon, 
  Sun, 
  Shield, 
  Zap, 
  Save,
  UserCircle, 
  Mail
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    highRiskAlerts: true,
    twoFactorAuth: false,
    autoRefresh: true,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
      variant: "success",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Theme</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <Label htmlFor="dark-mode">
                  {settings.darkMode ? "Dark Mode" : "Light Mode"}
                </Label>
              </div>
              <Switch
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={() => handleToggle('darkMode')}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle('pushNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <Label htmlFor="high-risk-alerts">High Risk Alerts</Label>
                </div>
                <Switch
                  id="high-risk-alerts"
                  checked={settings.highRiskAlerts}
                  onCheckedChange={() => handleToggle('highRiskAlerts')}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Security</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
              </div>
              <Switch
                id="two-factor-auth"
                checked={settings.twoFactorAuth}
                onCheckedChange={() => handleToggle('twoFactorAuth')}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Dashboard</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <Label htmlFor="auto-refresh">Auto-refresh Dashboard</Label>
              </div>
              <Switch
                id="auto-refresh"
                checked={settings.autoRefresh}
                onCheckedChange={() => handleToggle('autoRefresh')}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={saveSettings}>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
