'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, Project } from '@/lib/schema';
import { generateProjectCode } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import UploadDropzone from '@/components/UploadDropzone';
import { PhotoCategory, PhotoCategoryType } from '@/lib/schema';

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      code: generateProjectCode(),
      nutsvoorzieningen: [],
      soortAansluiting: 'nieuw',
      soortVerharding: 'asfalt',
      boringNoodzakelijk: false,
      buurtInformeren: false,
      wegafzettingNodig: false
    }
  });

  const watchedUtilities = watch('nutsvoorzieningen');

  const [pendingUploads, setPendingUploads] = useState<Record<string, File[]>>({});

  const onSubmit = async (data: Project) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Project aanmaken gefaald');
      }

      // Indien er bestanden klaarstaan: uploaden per categorie
      const projectId = result.project.id as number;
      const categories = Object.keys(pendingUploads);
      for (const category of categories) {
        const files = pendingUploads[category];
        if (!files || files.length === 0) continue;

        const formData = new FormData();
        formData.append('projectId', String(projectId));
        formData.append('category', category);
        files.forEach((file) => formData.append('files', file));

        try {
          await fetch('/api/upload', { method: 'POST', body: formData });
        } catch (e) {
          // Upload failed for category
        }
      }

      // Redirect naar project detail pagina
      router.push(`/projects/${projectId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Onbekende fout');
    } finally {
      setLoading(false);
    }
  };

  const handleUtilityChange = (utility: string, checked: boolean) => {
    const current = watchedUtilities || [];
    if (checked) {
      setValue('nutsvoorzieningen', [...current, utility as 'elektra' | 'gas' | 'water']);
    } else {
      setValue('nutsvoorzieningen', current.filter(u => u !== utility));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nieuw Schouwproject</h1>
        <p className="text-gray-600 mt-2">
          Voer de projectgegevens in voor een nieuwe schouw
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Algemene gegevens */}
        <Card>
          <CardHeader>
            <CardTitle>Algemene Gegevens</CardTitle>
            <CardDescription>
              Basis informatie over het project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="naam">Projectnaam *</Label>
                <Input
                  id="naam"
                  {...register('naam')}
                  placeholder="Bijv. Aansluiting woonwijk De Vliert"
                />
                {errors.naam && (
                  <p className="text-red-600 text-sm mt-1">{errors.naam.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="code">Projectcode *</Label>
                <Input
                  id="code"
                  {...register('code')}
                  placeholder="Automatisch gegenereerd"
                />
                {errors.code && (
                  <p className="text-red-600 text-sm mt-1">{errors.code.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="opdrachtgever">Opdrachtgever *</Label>
                <Input
                  id="opdrachtgever"
                  {...register('opdrachtgever')}
                  placeholder="Bijv. Gemeente Den Haag"
                />
                {errors.opdrachtgever && (
                  <p className="text-red-600 text-sm mt-1">{errors.opdrachtgever.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="uitvoerder">Uitvoerder *</Label>
                <Input
                  id="uitvoerder"
                  {...register('uitvoerder')}
                  placeholder="Naam uitvoerder"
                />
                {errors.uitvoerder && (
                  <p className="text-red-600 text-sm mt-1">{errors.uitvoerder.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="adres">Adres *</Label>
                <Input
                  id="adres"
                  {...register('adres')}
                  placeholder="Straat en huisnummer"
                />
                {errors.adres && (
                  <p className="text-red-600 text-sm mt-1">{errors.adres.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="postcode">Postcode *</Label>
                <Input
                  id="postcode"
                  {...register('postcode')}
                  placeholder="1234 AB"
                />
                {errors.postcode && (
                  <p className="text-red-600 text-sm mt-1">{errors.postcode.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="plaats">Plaats *</Label>
                <Input
                  id="plaats"
                  {...register('plaats')}
                  placeholder="Stad"
                />
                {errors.plaats && (
                  <p className="text-red-600 text-sm mt-1">{errors.plaats.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kabel- en leidinginformatie */}
        <Card>
          <CardHeader>
            <CardTitle>Kabel- en Leidinginformatie</CardTitle>
            <CardDescription>
              Technische specificaties van de aansluiting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kabellengte">Kabellengte (meter) *</Label>
                <Input
                  id="kabellengte"
                  type="number"
                  step="0.1"
                  {...register('kabellengte', { valueAsNumber: true })}
                  placeholder="0.0"
                />
                {errors.kabellengte && (
                  <p className="text-red-600 text-sm mt-1">{errors.kabellengte.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="capaciteit">Capaciteit *</Label>
                <Input
                  id="capaciteit"
                  type="number"
                  step="0.1"
                  {...register('capaciteit', { valueAsNumber: true })}
                  placeholder="0.0"
                />
                {errors.capaciteit && (
                  <p className="text-red-600 text-sm mt-1">{errors.capaciteit.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Nutsvoorzieningen *</Label>
              <div className="mt-2 space-y-2">
                {['elektra', 'gas', 'water'].map((utility) => (
                  <div key={utility} className="flex items-center space-x-2">
                    <Checkbox
                      id={utility}
                      checked={watchedUtilities?.includes(utility as 'elektra' | 'gas' | 'water') || false}
                      onCheckedChange={(checked) => 
                        handleUtilityChange(utility, checked as boolean)
                      }
                    />
                    <Label htmlFor={utility} className="capitalize">
                      {utility}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.nutsvoorzieningen && (
                <p className="text-red-600 text-sm mt-1">{errors.nutsvoorzieningen.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soortAansluiting">Soort aansluiting *</Label>
                <Select
                  value={watch('soortAansluiting')}
                  onValueChange={(value) => setValue('soortAansluiting', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer soort aansluiting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nieuw">Nieuw</SelectItem>
                    <SelectItem value="verzwaren">Verzwaren</SelectItem>
                    <SelectItem value="vervangen">Vervangen</SelectItem>
                    <SelectItem value="tijdelijk">Tijdelijk</SelectItem>
                  </SelectContent>
                </Select>
                {errors.soortAansluiting && (
                  <p className="text-red-600 text-sm mt-1">{errors.soortAansluiting.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="soortVerharding">Soort verharding *</Label>
                <Select
                  value={watch('soortVerharding')}
                  onValueChange={(value) => setValue('soortVerharding', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer soort verharding" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="klinkers">Klinkers</SelectItem>
                    <SelectItem value="asfalt">Asfalt</SelectItem>
                    <SelectItem value="tegels">Tegels</SelectItem>
                    <SelectItem value="onverhard">Onverhard</SelectItem>
                  </SelectContent>
                </Select>
                {errors.soortVerharding && (
                  <p className="text-red-600 text-sm mt-1">{errors.soortVerharding.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Civiel en veiligheid */}
        <Card>
          <CardHeader>
            <CardTitle>Civiel en Veiligheid</CardTitle>
            <CardDescription>
              Informatie over werkzaamheden en veiligheid
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="boringNoodzakelijk"
                  {...register('boringNoodzakelijk')}
                />
                <Label htmlFor="boringNoodzakelijk">
                  Boring noodzakelijk
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="buurtInformeren"
                  {...register('buurtInformeren')}
                />
                <Label htmlFor="buurtInformeren">
                  Buurt informeren
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wegafzettingNodig"
                  {...register('wegafzettingNodig')}
                />
                <Label htmlFor="wegafzettingNodig">
                  Wegafzetting nodig
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="traceBeschrijving">Tracébeschrijving</Label>
              <Textarea
                id="traceBeschrijving"
                {...register('traceBeschrijving')}
                placeholder="Beschrijf het tracé van de kabel/leiding..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="kruisingen">Kruisingen</Label>
              <Textarea
                id="kruisingen"
                {...register('kruisingen')}
                placeholder="Beschrijf kruisingen met andere leidingen..."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="obstakels">Obstakels</Label>
              <Textarea
                id="obstakels"
                {...register('obstakels')}
                placeholder="Boomwortels, leidingen, etc..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contactpersonen */}
        <Card>
          <CardHeader>
            <CardTitle>Contactpersonen</CardTitle>
            <CardDescription>
              Verantwoordelijke personen voor het project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="toezichthouder">Toezichthouder *</Label>
                <Input
                  id="toezichthouder"
                  {...register('toezichthouder')}
                  placeholder="Naam toezichthouder"
                />
                {errors.toezichthouder && (
                  <p className="text-red-600 text-sm mt-1">{errors.toezichthouder.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bereikbaarheden">Bereikbaarheden *</Label>
                <Input
                  id="bereikbaarheden"
                  {...register('bereikbaarheden')}
                  placeholder="Telefoon, email, etc."
                />
                {errors.bereikbaarheden && (
                  <p className="text-red-600 text-sm mt-1">{errors.bereikbaarheden.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foto's toevoegen (optioneel) */}
        <Card>
          <CardHeader>
            <CardTitle>Foto's toevoegen (optioneel)</CardTitle>
            <CardDescription>
              Voeg alvast foto's toe per categorie. Upload start na het aanmaken van het project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {([
              'meterkast',
              'gebouw',
              'locatie',
              'omgevingssituatie',
              'sleuf',
              'bijzonderheden',
            ] as PhotoCategoryType[]).map((cat) => (
              <div key={cat}>
                <UploadDropzone
                  category={cat}
                  onFilesUploaded={(files) => {
                    setPendingUploads((prev) => ({
                      ...prev,
                      [cat]: files.map((f) => f.file),
                    }));
                  }}
                  maxFiles={10}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Annuleren
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="schouw-button-primary"
          >
            {loading ? 'Aanmaken...' : 'Project Aanmaken'}
          </Button>
        </div>
      </form>
    </div>
  );
}
