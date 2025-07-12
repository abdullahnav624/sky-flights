// types.ts

export type Presentation = {
  title: string;
  suggestionTitle: string;
  subtitle: string;
};

export type RelevantFlightParams = {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
};

export type RelevantHotelParams = {
  entityId: string;
  entityType: string;
  localizedName: string;
};

export type Navigation = {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
};

export type LocationItem = {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
};
export interface RootObject {
  status: boolean;
  timestamp: number;
  data: Data;
}

export interface Data {
  context: Context;
  itineraries: Itinerary[];
  messages: any[];
  filterStats: FilterStats;
  flightsSessionId: string;
  destinationImageUrl: string;
}

export interface FilterStats {
  duration: Duration;
  total: number;
  hasCityOpenJaw: boolean;
  multipleCarriers: MultipleCarriers;
  airports: Airport2[];
  carriers: Carrier[];
  stopPrices: StopPrices;
  alliances: Alliance[];
}

export interface Alliance {
  id: number;
  name: string;
}

export interface StopPrices {
  direct: Direct;
  one: Direct;
  twoOrMore: TwoOrMore;
}

export interface TwoOrMore {
  isPresent: boolean;
}

export interface Direct {
  isPresent: boolean;
  formattedPrice: string;
  rawPrice: number;
}

export interface Carrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
  minPrice: string;
  allianceId: number;
}

export interface Airport2 {
  city: string;
  airports: Airport[];
}

export interface Airport {
  id: string;
  entityId: string;
  name: string;
}

export interface MultipleCarriers {
  minPrice: string;
  rawMinPrice: null;
}

export interface Duration {
  min: number;
  max: number;
  multiCityMin: number;
  multiCityMax: number;
}

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  fareAttributes: FareAttributes;
  tags?: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface FareAttributes {
}

export interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

export interface Leg {
  id: string;
  origin: Origin;
  destination: Origin;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

export interface Segment {
  id: string;
  origin: Origin2;
  destination: Origin2;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: MarketingCarrier;
  operatingCarrier: MarketingCarrier;
  transportMode: string;
}

export interface MarketingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

export interface Origin2 {
  flightPlaceId: string;
  displayCode: string;
  parent: Parent;
  name: string;
  type: string;
  country: string;
}

export interface Parent {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
}

export interface Carriers {
  marketing: Marketing[];
  operationType: string;
  operating?: Marketing[];
}

export interface Marketing {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface Origin {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

export interface Context {
  status: string;
  sessionId: string;
  totalResults: number;
}