package ru.bmstu.naburnm8.rpo.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bmstu.naburnm8.rpo.backend.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {}
