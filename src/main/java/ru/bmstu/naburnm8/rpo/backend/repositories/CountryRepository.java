package ru.bmstu.naburnm8.rpo.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bmstu.naburnm8.rpo.backend.models.Country;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {}
