// lib/auth.ts
import { cookies } from 'next/headers'
export function getCurrentUserId(): string { return cookies().get('uid')?.value || '' }


// Admin helpers
export function isAdmin(): boolean {
  const role = cookies().get('role')?.value || ''
  return role === 'admin'
}
export function requireAdmin(){ if(!isAdmin()) throw new Error('FORBIDDEN: admin required') }
