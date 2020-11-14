export class Customer {
  clientBank: string;
  clientID: string;
  consentID: string;
  customerID: string;
  customerPassport: string;
  consentTrack: string;
  consentStatus: string;
  activationStatus: string;
  customerSite: string;
  consentReusability: string;
  acceptedDate: string;
  confirmationTimestamp: string;
  validFrom: string;
  validUntil: string;
  modificationTimestamp: string;
  cancellationTimestamp: string;
  cancellationReason: string;
  cancellationInitiator: string;
  frequencyPerDay: number;
  accountPermissions: AcountPermission[];
}

export interface AcountPermission {
  scope: string;
  accountNumberIBAN: string;
  openingBranch: string;
  accountNumber: string;
  productCode: string;
  currencyCode: string;
  accountStatus: string;
  managingBranch: string;
}
