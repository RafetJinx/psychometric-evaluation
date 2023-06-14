package server.example.javaServer.model.info.userTypes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientInfo extends UserInfo {
    @Field("doctor_id")
    private String doctorId;

    @Field("parents")
    private List<String> parentIds;

    @Field("teachers")
    private List<String> teacherIds;

    @Field("diagnosis")
    private List<String> diagnoses;
}
