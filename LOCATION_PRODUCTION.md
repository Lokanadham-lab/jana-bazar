# Production location engine

Hierarchy:
`State/UT -> District -> Sub-District/Mandal -> Gram Panchayat/Local Body -> Village/Town -> PIN`

The UI requests each level from `/api/locations` using the parent LGD code. This avoids bundling hundreds of thousands of records into the browser.

`Use Current Location` first gets device coordinates. A server-side reverse-geocoding adapter then maps coordinates to LGD codes and address fields. If the provider is not configured, the application reports that condition instead of fabricating an address.

Location source should be synchronized from official LGD data. data.gov.in describes the LGD village, sub-district, district, state and local-body datasets and notes monthly updates.
