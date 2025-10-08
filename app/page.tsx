'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface Project {
  id: number;
  naam: string;
  code: string;
  opdrachtgever: string;
  adres: string;
  plaats: string;
  createdAt: string;
  status: 'nieuw' | 'in-analyse' | 'voltooid';
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        
        if (data.projects) {
          // Map database projects to display format
          const mappedProjects = data.projects.map((project: any) => ({
            id: project.id,
            naam: project.naam,
            code: project.code,
            opdrachtgever: project.opdrachtgever,
            adres: project.adres,
            plaats: project.plaats,
            createdAt: project.createdAt,
            status: (project.reports && project.reports.length > 0) ? 'voltooid' : 
                   (project.inspections && project.inspections.length > 0) ? 'in-analyse' : 'nieuw'
          }));
          
          setProjects(mappedProjects);
        }
      } catch (error) {
        // Error fetching projects
        // Fallback to empty array
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'voltooid':
        return <Badge className="bg-green-100 text-green-800">Voltooid</Badge>;
      case 'in-analyse':
        return <Badge className="bg-yellow-100 text-yellow-800">In analyse</Badge>;
      case 'nieuw':
        return <Badge className="bg-blue-100 text-blue-800">Nieuw</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Onbekend</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Laden...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overzicht van alle schouwprojecten
          </p>
        </div>
        <Link href="/projects/new">
          <Button className="schouw-button-primary">
            Nieuw Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="schouw-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.naam}</CardTitle>
                {getStatusBadge(project.status)}
              </div>
              <CardDescription>
                {project.code} • {project.opdrachtgever}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  📍 {project.adres}, {project.plaats}
                </p>
                <p className="text-sm text-gray-500">
                  📅 {formatDate(new Date(project.createdAt))}
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <Link href={`/projects/${project.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Bekijk Details
                  </Button>
                </Link>
                {project.status === 'voltooid' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Genereer PDF met nieuwe compacte format
                      fetch('/api/pdf', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ projectId: project.id })
                      }).then(response => {
                        if (response.ok) {
                          return response.blob();
                        }
                        throw new Error('PDF generatie gefaald');
                      }).then(blob => {
                        const url = URL.createObjectURL(blob);
                        window.open(url, '_blank');
                      }).catch(err => {
                        // PDF error occurred
                        alert('PDF generatie gefaald');
                      });
                    }}
                  >
                    📄 PDF
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="schouw-card text-center py-12">
          <CardContent>
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nog geen projecten
            </h3>
            <p className="text-gray-600 mb-4">
              Begin met het maken van je eerste schouwproject
            </p>
            <Link href="/projects/new">
              <Button className="schouw-button-primary">
                Eerste Project Maken
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
