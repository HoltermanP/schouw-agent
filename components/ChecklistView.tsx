'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPriorityColor, getStatusColor } from '@/lib/utils';
import { ALL_CHECKLISTS } from '@/lib/checklist';

interface Finding {
  category: string;
  status: 'conform' | 'niet-conform' | 'onbekend';
  description: string;
  evidence: string;
  priority: 'hoog' | 'midden' | 'laag';
  source: string;
  url?: string;
}

interface Risk {
  type: string;
  severity: 'hoog' | 'midden' | 'laag';
  description: string;
  mitigation: string;
}

interface Action {
  action: string;
  responsible: string;
  deadline?: string;
  priority: 'hoog' | 'midden' | 'laag';
}

interface ChecklistViewProps {
  findings: Finding[];
  risks: Risk[];
  actions: Action[];
  citations: Array<{
    title: string;
    url: string;
    date: string;
    relevance: string;
  }>;
}

export default function ChecklistView({ 
  findings, 
  risks, 
  actions, 
  citations 
}: ChecklistViewProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'conform':
        return '✅';
      case 'niet-conform':
        return '❌';
      case 'onbekend':
        return '❓';
      default:
        return '❓';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'hoog':
        return '🔴';
      case 'midden':
        return '🟡';
      case 'laag':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'hoog':
        return '🔴';
      case 'midden':
        return '🟡';
      case 'laag':
        return '🟢';
      default:
        return '⚪';
    }
  };

  // Groepeer bevindingen per categorie
  const findingsByCategory = findings.reduce((acc, finding) => {
    if (!acc[finding.category]) {
      acc[finding.category] = [];
    }
    acc[finding.category].push(finding);
    return acc;
  }, {} as Record<string, Finding[]>);

  return (
    <div className="space-y-6">
      {/* Samenvatting */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse Samenvatting</CardTitle>
          <CardDescription>
            Overzicht van de AI-analyse resultaten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {findings.length}
              </div>
              <div className="text-sm text-gray-600">Bevindingen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {risks.length}
              </div>
              <div className="text-sm text-gray-600">Risico's</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {actions.length}
              </div>
              <div className="text-sm text-gray-600">Acties</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bevindingen per categorie */}
      {Object.entries(findingsByCategory).map(([category, categoryFindings]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="capitalize">
              {category} ({categoryFindings.length} bevindingen)
            </CardTitle>
            <CardDescription>
              Technische beoordeling voor {category}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryFindings.map((finding, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getStatusIcon(finding.status)}
                    </span>
                    <Badge className={getStatusColor(finding.status)}>
                      {finding.status}
                    </Badge>
                    <Badge className={getPriorityColor(finding.priority)}>
                      {getPriorityIcon(finding.priority)} {finding.priority}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-gray-900">{finding.description}</p>
                  {finding.evidence && (
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Bewijsfoto:</strong> {finding.evidence}
                    </p>
                  )}
                </div>

                <div className="text-sm text-gray-500">
                  <strong>Bron:</strong> {finding.source}
                  {finding.url && (
                    <a 
                      href={finding.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-1 text-blue-600 hover:underline"
                    >
                      (link)
                    </a>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Risico's */}
      {risks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Geïdentificeerde Risico's</CardTitle>
            <CardDescription>
              Potentiële risico's en hun mitigatie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {risks.map((risk, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getSeverityIcon(risk.severity)}</span>
                  <Badge className={getPriorityColor(risk.severity)}>
                    {risk.severity} risico
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{risk.type}</h4>
                  <p className="text-gray-700 mt-1">{risk.description}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Mitigatie:</strong> {risk.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Acties */}
      {actions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Aanbevolen Acties</CardTitle>
            <CardDescription>
              Concrete stappen om het project te verbeteren
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {actions.map((action, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getPriorityIcon(action.priority)}</span>
                  <Badge className={getPriorityColor(action.priority)}>
                    {action.priority} prioriteit
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">{action.action}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Verantwoordelijke:</strong> {action.responsible}
                    {action.deadline && (
                      <span className="ml-2">
                        <strong>Deadline:</strong> {action.deadline}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Bronnen */}
      {citations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bronnen en Referenties</CardTitle>
            <CardDescription>
              Gebruikte bronnen voor de analyse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {citations.map((citation, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                <h4 className="font-medium text-gray-900">{citation.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Datum:</strong> {citation.date}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {citation.relevance}
                </p>
                <a 
                  href={citation.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {citation.url}
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Checklist referentie */}
      <Card>
        <CardHeader>
          <CardTitle>Checklist Referentie</CardTitle>
          <CardDescription>
            Volledige checklist items voor {Object.keys(findingsByCategory).join(', ')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.keys(findingsByCategory).map(category => {
              const checklistItems = ALL_CHECKLISTS.filter(item => item.category === category);
              return (
                <div key={category}>
                  <h4 className="font-medium text-gray-900 capitalize mb-2">
                    {category} checklist
                  </h4>
                  <div className="space-y-2">
                    {checklistItems.map((item, index) => (
                      <div key={index} className="text-sm border rounded p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <strong>{item.title}</strong>
                            <p className="text-gray-600 mt-1">{item.norm}</p>
                            <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                          </div>
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
