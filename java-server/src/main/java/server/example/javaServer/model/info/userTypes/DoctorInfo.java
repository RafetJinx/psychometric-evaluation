package server.example.javaServer.model.info.userTypes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;
import server.example.javaServer.model.userTypes.Patient;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorInfo extends UserInfo {
    @Field("permissions")
    private List<String> permissions;

    @Field("patients")
    private List<String> patientIds;
}
