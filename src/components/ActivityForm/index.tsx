import './index.scss';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { IActivityDetail } from '../types/activity.types';
import schema from './schema';

interface IActivityForm {
  addActivity: (activity: IActivityDetail) => void;
}

const ActivityForm = (props: IActivityForm) => {
  const { addActivity } = props;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IActivityDetail>({
    // @ts-expect-error ts(2322) -- bug from package, Recommended option: Downgrade the package
    resolver: yupResolver<IActivityDetail>(schema),
    defaultValues: {
      activities: [{ description: '', timeSpent: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities',
  });

  const onSubmit: SubmitHandler<IActivityDetail> = (data: IActivityDetail) => {
    addActivity(data);
    reset();
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Activity Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {/* User Info */}
        <div className="user-info">
          <h3 className="sub-title">User Information</h3>
          {/* Fullname */}
          <div className="form-group">
            <label className="form-label" htmlFor="fullname">
              Full name:
            </label>
            <input type="text" {...register('user.fullname')} className="form-control" />
            <p className="error-message">{errors.user?.fullname?.message}</p>
          </div>

          {/* Age */}
          <div className="form-group">
            <label className="form-label" htmlFor="age">
              Age:
            </label>
            <input type="text" {...register('user.age')} className="form-control" />
            <p className="error-message">{errors.user?.age?.message}</p>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number:
            </label>
            <input type="text" {...register('user.phone')} className="form-control" />
            <p className="error-message">{errors.user?.phone?.message}</p>
          </div>
        </div>

        {/* Activity Form */}
        <div className="activity-wrapper">
          {fields.map((activity, index) => (
            <div key={activity.id} className="activity-info">
              {index > 0 && <div className="border-top" />}
              <h3 className="sub-title">Activity {index + 1}</h3>
              {/* Description */}
              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  Description:
                </label>
                <textarea
                  {...register(`activities.${index}.description`)}
                  rows={10}
                  className="form-control"
                />
                <p className="error-message">
                  {errors.activities?.[index]?.description?.message}
                </p>
              </div>
              {/* Time Spent */}
              <div className="form-group">
                <label className="form-label" htmlFor="timeSpent">
                  Time Spent:
                </label>
                <input
                  type="text"
                  {...register(`activities.${index}.timeSpent`)}
                  className="form-control"
                />
                <p className="error-message">
                  {errors.activities?.[index]?.timeSpent?.message}
                </p>
              </div>

              {index > 0 && (
                <div className="form-group activity-add">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn btn--text btn--text-danger"
                  >
                    - Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="form-group activity-add">
          <button
            type="button"
            onClick={() => append({ description: '', timeSpent: '' })}
            className="btn btn--text"
          >
            + Add another
          </button>
        </div>

        <div className="form-group form-submit">
          <input type="submit" value="Submit" className="btn btn--primary" />
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
