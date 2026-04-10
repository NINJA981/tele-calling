'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Plus } from 'lucide-react';
import { useCampaigns } from '@/hooks/useCampaigns';
import { Contact, ContactStatus } from '@/lib/types';

const statusColors: Record<ContactStatus, string> = {
  active: 'bg-blue-500/20 text-blue-300',
  contacted: 'bg-slate-500/20 text-slate-300',
  'follow-up': 'bg-yellow-500/20 text-yellow-300',
  converted: 'bg-green-500/20 text-green-300',
};

export function ContactCampaignManager() {
  const { contacts, campaigns, addContact, createCampaign } = useCampaigns();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact_ids: [] as string[] });
  const [contactData, setContactData] = useState({ name: '', phone: '', email: '' });

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    let contactIdsToUse = formData.contact_ids;
    
    // Automatically select the first contact if none are explicitly selected but contacts exist
    if (contactIdsToUse.length === 0 && contacts.length > 0) {
      contactIdsToUse = [contacts[0].id];
    } else if (contactIdsToUse.length === 0) {
      alert("Please add at least one contact before creating a campaign.");
      return;
    }

    if (!formData.name) {
      alert("Please enter a campaign name.");
      return;
    }

    await createCampaign(formData.name, contactIdsToUse);
    setIsDialogOpen(false);
    setFormData({ name: '', contact_ids: [] });
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.phone) return;
    await addContact({ ...contactData, status: 'active' });
    setIsContactDialogOpen(false);
    setContactData({ name: '', phone: '', email: '' });
  };

  return (
    <div className="space-y-6 p-8">
      {/* Upload and Create Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* CSV Upload */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Import Contacts</CardTitle>
            <CardDescription className="text-slate-400">
              Upload CSV file with contact data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-slate-600 bg-slate-700/30 p-8">
              <Upload className="h-8 w-8 text-slate-400" />
              <div className="text-center">
                <p className="text-sm font-medium text-slate-300">
                  Drop CSV file here
                </p>
                <p className="text-xs text-slate-500">or click to browse</p>
              </div>
              <Input
                type="file"
                accept=".csv"
                className="hidden"
                id="csv-upload"
              />
              <div className="flex w-full justify-center gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
                <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Add Contact</Button>
                  </DialogTrigger>
                  <DialogContent className="border-slate-700 bg-slate-900">
                    <DialogHeader>
                      <DialogTitle className="text-white">Add Contact</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddContact} className="space-y-4">
                      <Input
                        placeholder="Name"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                      />
                      <Input
                        placeholder="Phone (e.g. +1...)"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                      />
                      <Input
                        placeholder="Email (optional)"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                      />
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Save</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Campaign */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Create Campaign</CardTitle>
            <CardDescription className="text-slate-400">
              Launch new outreach campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="border-slate-700 bg-slate-900">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Create Campaign
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Set up a new outreach campaign
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleCreateCampaign}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name" className="text-slate-300">
                      Campaign Name
                    </Label>
                    <Input
                      id="campaign-name"
                      placeholder="Q2 Enterprise Push"
                      className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-list" className="text-slate-300">
                      Contact List
                    </Label>
                    <Select
                      value={formData.contact_ids[0] || ""}
                      onValueChange={(value) =>
                        setFormData({ ...formData, contact_ids: [value] })
                      }
                    >
                      <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                        <SelectValue placeholder="Select contacts..." />
                      </SelectTrigger>
                      <SelectContent className="border-slate-700 bg-slate-900">
                        {contacts.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name} ({c.phone})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Create Campaign
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Table */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Contacts</CardTitle>
          <CardDescription className="text-slate-400">
            {contacts.length} total contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-transparent">
                  <TableHead className="text-slate-400">Name</TableHead>
                  <TableHead className="text-slate-400">Phone</TableHead>
                  <TableHead className="text-slate-400">Email</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">
                    Last Contacted
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact: Contact) => (
                  <TableRow
                    key={contact.id}
                    className="border-slate-700 hover:bg-slate-700/50"
                  >
                    <TableCell className="font-medium text-white">
                      {contact.name}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {contact.phone}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {contact.email || '—'}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[contact.status]}>
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400">
                      {contact.last_contacted || '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
