import { projectSchema, PhotoCategory } from '@/lib/schema';

describe('Project Schema', () => {
  it('should validate a valid project', () => {
    const validProject = {
      naam: 'Test Project',
      code: 'TEST-001',
      opdrachtgever: 'Test Client',
      adres: 'Teststraat 123',
      postcode: '1234 AB',
      plaats: 'Teststad',
      kabellengte: 100,
      nutsvoorzieningen: ['elektra', 'gas'],
      soortAansluiting: 'nieuw',
      capaciteit: 25,
      soortVerharding: 'asfalt',
      boringNoodzakelijk: false,
      buurtInformeren: true,
      wegafzettingNodig: false,
      uitvoerder: 'Test Uitvoerder',
      toezichthouder: 'Test Toezichthouder',
      bereikbaarheden: '06-12345678'
    };

    const result = projectSchema.safeParse(validProject);
    expect(result.success).toBe(true);
  });

  it('should reject invalid postcode', () => {
    const invalidProject = {
      naam: 'Test Project',
      code: 'TEST-001',
      opdrachtgever: 'Test Client',
      adres: 'Teststraat 123',
      postcode: 'invalid',
      plaats: 'Teststad',
      kabellengte: 100,
      nutsvoorzieningen: ['elektra'],
      soortAansluiting: 'nieuw',
      capaciteit: 25,
      soortVerharding: 'asfalt',
      boringNoodzakelijk: false,
      buurtInformeren: true,
      wegafzettingNodig: false,
      uitvoerder: 'Test Uitvoerder',
      toezichthouder: 'Test Toezichthouder',
      bereikbaarheden: '06-12345678'
    };

    const result = projectSchema.safeParse(invalidProject);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('Ongeldige postcode');
    }
  });

  it('should reject negative kabellengte', () => {
    const invalidProject = {
      naam: 'Test Project',
      code: 'TEST-001',
      opdrachtgever: 'Test Client',
      adres: 'Teststraat 123',
      postcode: '1234 AB',
      plaats: 'Teststad',
      kabellengte: -10,
      nutsvoorzieningen: ['elektra'],
      soortAansluiting: 'nieuw',
      capaciteit: 25,
      soortVerharding: 'asfalt',
      boringNoodzakelijk: false,
      buurtInformeren: true,
      wegafzettingNodig: false,
      uitvoerder: 'Test Uitvoerder',
      toezichthouder: 'Test Toezichthouder',
      bereikbaarheden: '06-12345678'
    };

    const result = projectSchema.safeParse(invalidProject);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('positief getal');
    }
  });

  it('should reject empty nutsvoorzieningen', () => {
    const invalidProject = {
      naam: 'Test Project',
      code: 'TEST-001',
      opdrachtgever: 'Test Client',
      adres: 'Teststraat 123',
      postcode: '1234 AB',
      plaats: 'Teststad',
      kabellengte: 100,
      nutsvoorzieningen: [],
      soortAansluiting: 'nieuw',
      capaciteit: 25,
      soortVerharding: 'asfalt',
      boringNoodzakelijk: false,
      buurtInformeren: true,
      wegafzettingNodig: false,
      uitvoerder: 'Test Uitvoerder',
      toezichthouder: 'Test Toezichthouder',
      bereikbaarheden: '06-12345678'
    };

    const result = projectSchema.safeParse(invalidProject);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('minimaal één nutsvoorziening');
    }
  });
});

describe('PhotoCategory', () => {
  it('should have correct category values', () => {
    expect(PhotoCategory.METERKAST).toBe('meterkast');
    expect(PhotoCategory.GEBOUW).toBe('gebouw');
    expect(PhotoCategory.LOCATIE).toBe('locatie');
    expect(PhotoCategory.OMGEVINGSSITUATIE).toBe('omgevingssituatie');
    expect(PhotoCategory.SLEUF).toBe('sleuf');
    expect(PhotoCategory.BIJZONDERHEDEN).toBe('bijzonderheden');
  });
});
