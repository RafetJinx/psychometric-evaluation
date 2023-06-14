import React from 'react'

// page imports
import PatientDiagnosesButton from './PatientDiagnosesButton'
import UserDropdown from '../user/UserDropdown'

// semantic-ui-react imports
import { Grid, Segment } from 'semantic-ui-react'

const GridExampleFloated = () => (
    <Grid stackable columns={2}>
        <Grid.Column>
            <Segment>
                <PatientDiagnosesButton />
            </Segment>
        </Grid.Column>
        <Grid.Column>
            <Segment>
                <UserDropdown />
            </Segment>
        </Grid.Column>
    </Grid>
)

export default GridExampleFloated