package io.xtra.ocr.application.web.rest;

import io.xtra.ocr.application.XtraOcrApp;

import io.xtra.ocr.application.domain.TextDetection;
import io.xtra.ocr.application.repository.TextDetectionRepository;
import io.xtra.ocr.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.xtra.ocr.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TextDetectionResource REST controller.
 *
 * @see TextDetectionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = XtraOcrApp.class)
public class TextDetectionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TextDetectionRepository textDetectionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTextDetectionMockMvc;

    private TextDetection textDetection;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TextDetectionResource textDetectionResource = new TextDetectionResource(textDetectionRepository);
        this.restTextDetectionMockMvc = MockMvcBuilders.standaloneSetup(textDetectionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TextDetection createEntity(EntityManager em) {
        TextDetection textDetection = new TextDetection()
            .name(DEFAULT_NAME);
        return textDetection;
    }

    @Before
    public void initTest() {
        textDetection = createEntity(em);
    }

    @Test
    @Transactional
    public void createTextDetection() throws Exception {
        int databaseSizeBeforeCreate = textDetectionRepository.findAll().size();

        // Create the TextDetection
        restTextDetectionMockMvc.perform(post("/api/text-detections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textDetection)))
            .andExpect(status().isCreated());

        // Validate the TextDetection in the database
        List<TextDetection> textDetectionList = textDetectionRepository.findAll();
        assertThat(textDetectionList).hasSize(databaseSizeBeforeCreate + 1);
        TextDetection testTextDetection = textDetectionList.get(textDetectionList.size() - 1);
        assertThat(testTextDetection.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTextDetectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = textDetectionRepository.findAll().size();

        // Create the TextDetection with an existing ID
        textDetection.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTextDetectionMockMvc.perform(post("/api/text-detections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textDetection)))
            .andExpect(status().isBadRequest());

        // Validate the TextDetection in the database
        List<TextDetection> textDetectionList = textDetectionRepository.findAll();
        assertThat(textDetectionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = textDetectionRepository.findAll().size();
        // set the field null
        textDetection.setName(null);

        // Create the TextDetection, which fails.

        restTextDetectionMockMvc.perform(post("/api/text-detections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textDetection)))
            .andExpect(status().isBadRequest());

        List<TextDetection> textDetectionList = textDetectionRepository.findAll();
        assertThat(textDetectionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTextDetections() throws Exception {
        // Initialize the database
        textDetectionRepository.saveAndFlush(textDetection);

        // Get all the textDetectionList
        restTextDetectionMockMvc.perform(get("/api/text-detections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(textDetection.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getTextDetection() throws Exception {
        // Initialize the database
        textDetectionRepository.saveAndFlush(textDetection);

        // Get the textDetection
        restTextDetectionMockMvc.perform(get("/api/text-detections/{id}", textDetection.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(textDetection.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTextDetection() throws Exception {
        // Get the textDetection
        restTextDetectionMockMvc.perform(get("/api/text-detections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTextDetection() throws Exception {
        // Initialize the database
        textDetectionRepository.saveAndFlush(textDetection);

        int databaseSizeBeforeUpdate = textDetectionRepository.findAll().size();

        // Update the textDetection
        TextDetection updatedTextDetection = textDetectionRepository.findById(textDetection.getId()).get();
        // Disconnect from session so that the updates on updatedTextDetection are not directly saved in db
        em.detach(updatedTextDetection);
        updatedTextDetection
            .name(UPDATED_NAME);

        restTextDetectionMockMvc.perform(put("/api/text-detections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTextDetection)))
            .andExpect(status().isOk());

        // Validate the TextDetection in the database
        List<TextDetection> textDetectionList = textDetectionRepository.findAll();
        assertThat(textDetectionList).hasSize(databaseSizeBeforeUpdate);
        TextDetection testTextDetection = textDetectionList.get(textDetectionList.size() - 1);
        assertThat(testTextDetection.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTextDetection() throws Exception {
        int databaseSizeBeforeUpdate = textDetectionRepository.findAll().size();

        // Create the TextDetection

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTextDetectionMockMvc.perform(put("/api/text-detections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textDetection)))
            .andExpect(status().isBadRequest());

        // Validate the TextDetection in the database
        List<TextDetection> textDetectionList = textDetectionRepository.findAll();
        assertThat(textDetectionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTextDetection() throws Exception {
        // Initialize the database
        textDetectionRepository.saveAndFlush(textDetection);

        int databaseSizeBeforeDelete = textDetectionRepository.findAll().size();

        // Delete the textDetection
        restTextDetectionMockMvc.perform(delete("/api/text-detections/{id}", textDetection.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TextDetection> textDetectionList = textDetectionRepository.findAll();
        assertThat(textDetectionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TextDetection.class);
        TextDetection textDetection1 = new TextDetection();
        textDetection1.setId(1L);
        TextDetection textDetection2 = new TextDetection();
        textDetection2.setId(textDetection1.getId());
        assertThat(textDetection1).isEqualTo(textDetection2);
        textDetection2.setId(2L);
        assertThat(textDetection1).isNotEqualTo(textDetection2);
        textDetection1.setId(null);
        assertThat(textDetection1).isNotEqualTo(textDetection2);
    }
}
