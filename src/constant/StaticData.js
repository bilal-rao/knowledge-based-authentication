export const product = {
  "allowMultipleApplications": false,
  "dedupings": null,
  "discrepancies": null,
  "documentRequirements": null,
  "id": "bd6d94aa-a52b-46b9-bb7e-c9f7d18abd66",
  "parentId": "",
  "policies": null,
  "processingFees": null,
  "scoringCard": null,
  "scoringWeightages": null,
  "spread": null,
  "stages": [
    {
      "code": "QDE",
      "description": null,
      "fields": [
        {
          "deferredUntilStageId": null,
          "deferValidation": false,
          "deviationId": "",
          "fieldId": "48",
          "group": "Initialize Application",
          "isRequired": true,
          "sourceId": "2",
          "subgroup": ""
        },
        {
          "deferredUntilStageId": null,
          "deferValidation": false,
          "deviationId": null,
          "fieldId": "49",
          "group": "Initialize Application",
          "isRequired": true,
          "sourceId": "2",
          "subgroup": null
        },
        {
          "deferredUntilStageId": null,
          "deferValidation": false,
          "deviationId": "1",
          "fieldId": "33",
          "group": "Initialize Application",
          "isRequired": true,
          "sourceId": "2",
          "subgroup": null
        },
        {
          "deferredUntilStageId": null,
          "deferValidation": false,
          "deviationId": "1",
          "fieldId": "47",
          "group": "Initialize Application",
          "isRequired": true,
          "sourceId": "2",
          "subgroup": null
        },
        {
          "deferredUntilStageId": null,
          "deferValidation": false,
          "deviationId": "2",
          "fieldId": "44",
          "group": "Sourcing",
          "isRequired": true,
          "sourceId": "1",
          "subgroup": null
        }
      ],
      "group": "QDE",
      "id": "4f6bb2e8-de94-4c56-bce8-34a5790c8e9f",
      "isCheckingRequired": true,
      "name": "Quick Data Entry (QDE)",
      "status": 0,
      "turnAroundTime": 48
    },
    {
      "code": "DDE",
      "description": null,
      "fields": [
        {
          "deferredUntilStageId": null,
          "deferValidation": false,
          "deviationId": "",
          "fieldId": "32",
          "group": "Sourcing",
          "isRequired": true,
          "sourceId": "2",
          "subgroup": null
        },
        {
          "deferredUntilStageId": null,
          "deferValidation": false,
          "deviationId": "",
          "fieldId": "48",
          "group": "Demographic",
          "isRequired": true,
          "sourceId": "2",
          "subgroup": "Personal Detail"
        }
      ],
      "group": "DDE",
      "id": "591bdc86-c00d-478e-aa65-98ed0c5823f9",
      "isCheckingRequired": true,
      "name": "Detail Data Entry (DDE)",
      "status": 0,
      "turnAroundTime": 72
    }
  ],
  "status": 0,
  "code": "MBLoan",
  "created": "0001-01-01T00:00:00+00:00",
  "createdBy": 0,
  "description": "Sample",
  "institutionId": null,
  "lastUpdated": "2019-04-25T15:50:31.5245789+00:00",
  "name": "Mobile Loan",
  "scrutinizerId": null,
  "scrutinizerStatus": 0,
  "updatedBy": 1
}
