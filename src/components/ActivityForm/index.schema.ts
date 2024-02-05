import * as yup from 'yup';

const activitySchema = yup.object().shape({
  description: yup.string().required('Description is required'),
  timeSpent: yup.string().required('Time spent is required'),
});

const userSchema = yup.object().shape({
  fullname: yup.string().required('Full name is required'),
  age: yup
    .number()
    .typeError('Must be number')
    .required('Age is required')
    .positive('Age must be positive')
    .integer(),
  phone: yup.number().typeError('Must be number').required('Phone number is required'),
});

export default yup.object().shape({
  user: userSchema,
  activities: yup.array().of(activitySchema),
});
