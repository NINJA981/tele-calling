'use client';

import { useState, useEffect } from 'react';
import { Campaign, Contact } from '@/lib/types';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campRes, contRes] = await Promise.all([
          fetch('/api/campaigns'),
          fetch('/api/contacts')
        ]);
        const camps = await campRes.json();
        const conts = await contRes.json();
        setCampaigns(camps);
        setContacts(conts);
      } catch (e) {
        console.error("Failed to fetch campaigns/contacts", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addContact = async (contactInfo: Partial<Contact>) => {
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo)
      });
      const newContact = await res.json();
      setContacts((prev) => [newContact, ...prev]);
    } catch (e) {
      console.error(e);
    }
  };

  const createCampaign = async (name: string, contactIds: string[]) => {
    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact_ids: contactIds })
      });
      const newCampaign = await res.json();
      setCampaigns((prev) => [newCampaign, ...prev]);
      // The backend will also trigger calls to those contacts
    } catch (e) {
      console.error(e);
    }
  };

  return { campaigns, contacts, isLoading, addContact, createCampaign };
}
