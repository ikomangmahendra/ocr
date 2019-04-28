package io.xtra.ocr.application.repository;

import io.xtra.ocr.application.domain.TextDetection;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TextDetection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TextDetectionRepository extends JpaRepository<TextDetection, Long> {

}
