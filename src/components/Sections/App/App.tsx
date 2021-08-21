import React, { useEffect } from 'react';
import { Section } from '@components/Blocks';
import { useForm } from '@components/Forms/hooks';
import { AddForm, UpdateForm } from '@components/Forms';
import Table from '@components/Sections/App/Table/Table';
import { observer } from 'mobx-react';
import { useModal } from '@components/hooks';
import { Form, FormStore as FormStoreInterface, ModalToggable } from '@components/interfaces';
import FormStore from '@components/Forms/FormStore';
import appStore from '@components/Sections/App/AppStore';
import UpdateFormModal from './UpdateFormModal/UpdateFormModal';
import cn from 'classnames';
import * as styles from './App.module.scss';

const formStore: FormStoreInterface = new FormStore();

function App() {
  useEffect(() => {
    formStore.setFields({
      name: {
        value: '',
        type: 'text',
        placeholder: 'Name',
        attributes: {
          maxLength: 100,
        },
        validation: {
          rules: [
            { name: 'required', error: 'You must fill your name' },
            { name: 'min', payload: 2, error: 'Name must be longer than 2 symbols' },
          ],
        },
      },
      age: {
        value: '',
        type: 'text',
        placeholder: 'Age',
        attributes: {
          maxLength: 3,
        },
        validation: {
          rules: [
            { name: 'required', error: 'You must fill your age' },
            { name: 'notRegex', payload: /\D/g, error: 'Please input the correct age' },
            { name: 'moreThan', payload: 16, error: 'Your age must be more than 16' },
            { name: 'lessThan', payload: 90, error: 'Your age must be less than 90' },
          ],
        },
      },
      surname: {
        value: '',
        type: 'text',
        placeholder: 'Surname',
        attributes: {
          maxLength: 100,
        },
        validation: {
          rules: [
            { name: 'required', error: 'You must fill your surname' },
            { name: 'min', payload: 2, error: 'Surname must be longer than 2 symbols' },
          ],
        },
      },
      city: {
        value: ['Riga'],
        placeholder: 'City',
        options: ['Riga', 'Daugavpils', 'Jūrmala', 'Ventspils'],
        validation: {
          rules: [{ name: 'selected', error: 'You must select city' }],
        },
        notEmpty: false,
      },
    });
    formStore.setSubmit({
      onSubmit: (values: any) => {
        return new Promise<void>((resolve, reject) => {
          resolve();
          appStore.addTableRecord(0, {
            name: values.name,
            surname: values.surname,
            age: values.age,
            city: values.city[0],
          });
        });
      },
      reset: true,
    });
    formStore.setReady(true);
  }, []);

  const form: Form = useForm(formStore);

  const { open, close }: ModalToggable = useModal();

  const update = (tableIndex: number, recordIndex: number) => {
    open(
      <UpdateFormModal close={close}>
        <UpdateForm
          record={appStore.tables[tableIndex][recordIndex]}
          tableIndex={tableIndex}
          recordIndex={recordIndex}
          closeModal={close}
        />
      </UpdateFormModal>,
    );
  };

  return (
    <div className={cn(styles.app)}>
      <Section>
        <AddForm form={form} />
        <AddForm form={form} />
      </Section>
      {appStore.tables.map((table: any, i: any) => {
        return (
          <Section key={i}>
            <Table
              tableIndex={i}
              data={table}
              copyHandler={appStore.cloneTable}
              deleteHandler={appStore.deleteTable}
              recordDeleteHandler={appStore.deleteTableRecord}
              recordUpdateHandler={update}
              canBeDeleted={i > 0}
            />
          </Section>
        );
      })}
    </div>
  );
}

export default observer(App);
