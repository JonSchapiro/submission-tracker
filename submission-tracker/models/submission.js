import t from 'tcomb-form-native';

const BELTS = t.enums({
    WHITE: 'White',
    BLUE: 'Blue',
    PURPLE: 'Purple',
    BROWN: 'Brown',
    BLACK: 'Black'
});

const TYPE = t.enums({
    SUBMISSION: 'subs',
    PASS: 'passes',
    SWEEPS: 'sweeps'
});

const Submission = t.struct({
  type: TYPE,
  position: t.String,
  positionName: BELTS,
  yourBelt: BELTS,
  boa: t.Boolean,
  theirBelt: t.Date
});

export default Submission;