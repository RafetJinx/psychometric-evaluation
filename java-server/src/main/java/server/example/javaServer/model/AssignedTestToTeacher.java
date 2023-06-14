package server.example.javaServer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignedTestToTeacher {
    @Field("test_id")
    private String testId;

    @Field("results")
    private Results results;

    @Field("solved")
    private Boolean solved;

    @Field("added_at")
    private LocalDateTime addedAt;

    @Field("solved_at")
    private LocalDateTime solvedAt;

    @Field("related_patient")
    private String relatedPatient;
}
