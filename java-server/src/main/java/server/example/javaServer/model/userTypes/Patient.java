package server.example.javaServer.model.userTypes;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.example.javaServer.model.AssignedTestToPatient;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "patient")
public class Patient extends User {
    @Field("doctor_id")
    private String doctorId;

    @Field("assigned_tests")
    private List<AssignedTestToPatient> assignedTests;

    @Field("parents")
    private List<String> parents;

    @Field("teachers")
    private List<String> teachers;

    @Field("diagnosis")
    private List<String> diagnosis;
}
