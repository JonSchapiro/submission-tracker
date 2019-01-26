import t from 'tcomb-form-native';

const BELTS = t.enums({
    WHITE: 'White',
    BLUE: 'Blue',
    PURPLE: 'Purple',
    BROWN: 'Brown',
    BLACK: 'Black'
});

const TYPE = t.enums({
    subs: 'SUBMISSION',
    passes: 'PASS',
    sweeps: 'SWEEPS'
});

const Submission = t.struct({
  type: TYPE,
  boa: t.Boolean,
  position: t.String,
  positionName: t.String,
  yourBelt: BELTS,
  theirBelt: BELTS,
  date: t.Date
});

export default Submission;