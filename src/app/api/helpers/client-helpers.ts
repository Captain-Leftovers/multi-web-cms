'use client'


import { useSelectedLayoutSegment } from 'next/navigation'

export function isActiveLink(targetSegment:string | null) {
  const activeSegment = useSelectedLayoutSegment()
  console.log('targetSegment', targetSegment);
  
  console.log('activeSegment', activeSegment)
  return targetSegment === activeSegment;
}

