# Production location engine

Hierarchy:
`State/UT -> District -> Sub-District/Mandal -> Gram Panchayat/Local Body -> Village/Town -> PIN`

The UI requests each level from `/api/locations` using the parent LGD code. This avoids bundling hundreds of thousands of records into the browser.

`Use Current Location` first gets device coordinates. A server-side reverse-geocoding adapter then maps coordinates to LGD codes and address fields. If the provider is not configured, the application reports that condition instead of fabricating an address.

Location source should be synchronized from official LGD data. data.gov.in describes the LGD village, sub-district, district, state and local-body datasets and notes monthly updates.

## V20 current location behavior
- Uses HTTPS browser geolocation with high-accuracy attempt and low-accuracy fallback.
- Saves latitude, longitude and accuracy immediately after capture.
- Reverse-geocodes through `/api/reverse-geocode`.
- Uses configured provider when `REVERSE_GEOCODE_URL_TEMPLATE` is set.
- Otherwise uses low-volume Nominatim fallback for development/small-scale use.
- If reverse geocoding is unavailable, coordinates are still saved and the user is not blocked.
