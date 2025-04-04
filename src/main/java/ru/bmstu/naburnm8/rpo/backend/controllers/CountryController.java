package ru.bmstu.naburnm8.rpo.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.bmstu.naburnm8.rpo.backend.models.Artist;
import ru.bmstu.naburnm8.rpo.backend.models.Country;
import ru.bmstu.naburnm8.rpo.backend.repositories.CountryRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/countries")
public class CountryController {
    @Autowired
    CountryRepository countryRepository;

    @GetMapping()
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Country> createCountry(@RequestBody Country country) {
        try {
            Country savedCountry = countryRepository.save(country);
            return new ResponseEntity<>(savedCountry, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Country> updateCountry(@RequestBody Country country, @PathVariable long id) {
        Country countryObject;
        Optional<Country> cc = countryRepository.findById(id);
        if (cc.isPresent()) {
            countryObject = cc.get();
            countryObject.name = country.name;
            countryRepository.save(countryObject);
            return ResponseEntity.ok(countryObject);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Country not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Country> deleteCountry(@PathVariable Long id) {
        Optional<Country> country = countryRepository.findById(id);
        if (country.isPresent()) {
            countryRepository.delete(country.get());
        }
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Artist not found");
        return ResponseEntity.ok(country.get());
    }

    @GetMapping("/{id}/artists")
    public ResponseEntity<List<Artist>> getArtistsByCountry(@PathVariable long id) {
        Optional<Country> country = countryRepository.findById(id);
        if (country.isPresent()) {
            return ResponseEntity.ok(country.get().artists);
        }
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Country not found");
    }
}
