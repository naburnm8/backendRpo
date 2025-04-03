package ru.bmstu.naburnm8.rpo.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bmstu.naburnm8.rpo.backend.models.Artist;

public interface ArtistRepository extends JpaRepository<Artist, Integer> {}
