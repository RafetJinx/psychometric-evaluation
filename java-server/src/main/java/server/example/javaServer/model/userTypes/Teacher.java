package server.example.javaServer.model.userTypes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import server.example.javaServer.model.AssignedTestToTeacher;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "teacher")
public class Teacher extends User {
    @Field("assigned_tests")
    private List<AssignedTestToTeacher> assignedTests;

    @Field("related_patients")
    private List<String> relatedPatientIds;
}