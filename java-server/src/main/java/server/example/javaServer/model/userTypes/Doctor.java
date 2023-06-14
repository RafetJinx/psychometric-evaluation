package server.example.javaServer.model.userTypes;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "doctor")
public class Doctor extends User {
    @Field("permissions")
    private List<String> permissions;

    @Field("patients")
    private List<String> patientIds;
}
