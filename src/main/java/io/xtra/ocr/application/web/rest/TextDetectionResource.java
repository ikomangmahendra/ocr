package io.xtra.ocr.application.web.rest;
import io.xtra.ocr.application.domain.TextDetection;
import io.xtra.ocr.application.repository.TextDetectionRepository;
import io.xtra.ocr.application.web.rest.errors.BadRequestAlertException;
import io.xtra.ocr.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TextDetection.
 */
@RestController
@RequestMapping("/api")
public class TextDetectionResource {

    private final Logger log = LoggerFactory.getLogger(TextDetectionResource.class);

    private static final String ENTITY_NAME = "textDetection";

    private final TextDetectionRepository textDetectionRepository;

    public TextDetectionResource(TextDetectionRepository textDetectionRepository) {
        this.textDetectionRepository = textDetectionRepository;
    }

    /**
     * POST  /text-detections : Create a new textDetection.
     *
     * @param textDetection the textDetection to create
     * @return the ResponseEntity with status 201 (Created) and with body the new textDetection, or with status 400 (Bad Request) if the textDetection has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/text-detections")
    public ResponseEntity<TextDetection> createTextDetection(@Valid @RequestBody TextDetection textDetection) throws URISyntaxException {
        log.debug("REST request to save TextDetection : {}", textDetection);
        if (textDetection.getId() != null) {
            throw new BadRequestAlertException("A new textDetection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TextDetection result = textDetectionRepository.save(textDetection);
        return ResponseEntity.created(new URI("/api/text-detections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /text-detections : Updates an existing textDetection.
     *
     * @param textDetection the textDetection to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated textDetection,
     * or with status 400 (Bad Request) if the textDetection is not valid,
     * or with status 500 (Internal Server Error) if the textDetection couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/text-detections")
    public ResponseEntity<TextDetection> updateTextDetection(@Valid @RequestBody TextDetection textDetection) throws URISyntaxException {
        log.debug("REST request to update TextDetection : {}", textDetection);
        if (textDetection.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TextDetection result = textDetectionRepository.save(textDetection);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, textDetection.getId().toString()))
            .body(result);
    }

    /**
     * GET  /text-detections : get all the textDetections.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of textDetections in body
     */
    @GetMapping("/text-detections")
    public List<TextDetection> getAllTextDetections() {
        log.debug("REST request to get all TextDetections");
        return textDetectionRepository.findAll();
    }

    /**
     * GET  /text-detections/:id : get the "id" textDetection.
     *
     * @param id the id of the textDetection to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the textDetection, or with status 404 (Not Found)
     */
    @GetMapping("/text-detections/{id}")
    public ResponseEntity<TextDetection> getTextDetection(@PathVariable Long id) {
        log.debug("REST request to get TextDetection : {}", id);
        Optional<TextDetection> textDetection = textDetectionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(textDetection);
    }

    /**
     * DELETE  /text-detections/:id : delete the "id" textDetection.
     *
     * @param id the id of the textDetection to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/text-detections/{id}")
    public ResponseEntity<Void> deleteTextDetection(@PathVariable Long id) {
        log.debug("REST request to delete TextDetection : {}", id);
        textDetectionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
