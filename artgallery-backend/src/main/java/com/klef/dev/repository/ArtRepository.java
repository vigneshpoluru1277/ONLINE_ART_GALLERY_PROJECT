package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.dev.model.Art;

public interface ArtRepository extends JpaRepository<Art, Long> {}
