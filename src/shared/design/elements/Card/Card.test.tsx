import { render } from '@testing-library/react-native';
import { Card } from './Card';
import { Typography } from '../Typography/Typography';

describe('Design > Elements > Card', () => {
  // Requirement: Smoke test
  it('works', () => {
    render(
      <Card>
        <Typography>Test Card</Typography>
      </Card>,
    );
  });

  // Requirement: Integration test
  // Tests the integration between the Card wrapper and the Typography child component
  it('integrates properly with Typography to display content', () => {
    const { getByText } = render(
      <Card>
        <Typography variant='normal'>Integrated Title</Typography>
        <Typography variant='normal'>This is inside the card.</Typography>
      </Card>,
    );

    // Verify both integrated pieces rendered to the screen properly
    expect(getByText('Integrated Title')).toBeTruthy();
    expect(getByText('This is inside the card.')).toBeTruthy();
  });
});
