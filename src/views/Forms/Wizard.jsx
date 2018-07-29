import React from "react";

// core components
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import PersonalS1 from "./WizardSteps/PersonalS1.jsx";
import PayrollS2 from "./WizardSteps/PayrollS2";
import CompetenciesS3 from "./WizardSteps/CompetenciesS3";
//import PoliciesS4 from "./WizardSteps/PoliciesS4";
//import InductionS5 from "./WizardSteps/InductionS5";

class WizardView extends React.Component {
  finishButtonClick() {
    console.log();
  }
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Wizard
            steps={[
              { stepName: "Personal", stepComponent: PersonalS1, stepId: "personal" },
              { stepName: "Payroll", stepComponent: PayrollS2, stepId: "payroll" },
              { stepName: "Competencies", stepComponent: CompetenciesS3, stepId: "competencies" },
             // { stepName: "Company Policies", stepComponent: PoliciesS4, stepId: "policies" },
             // { stepName: "Induction", stepComponent: InductionS5, stepId: "induction" }
            ]}
            finishButtonClick={this.finishButtonClick}
            title="Build Your Employee Profile"
            subtitle="This wizard will insert your details into your company profile."
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default WizardView;
