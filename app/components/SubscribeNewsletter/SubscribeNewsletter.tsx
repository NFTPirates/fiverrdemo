'use client';
import { addSubscriber } from '@/app/actions/addSubscriber';
import { Card, CardBody, Button, Input } from '@nextui-org/react';
import { useFormState, useFormStatus } from 'react-dom';
import styles from './subscribeNewsletter.module.css';
const initialState = {
    message: '',
};
export default function App() {
    const { pending } = useFormStatus();
    const [state, formAction] = useFormState(addSubscriber, initialState);

    // TODO better form error handling

    return (
        <Card fullWidth isBlurred className="border-none" shadow="sm">
            <CardBody>
                <div className={styles.container}>
                    <div className={styles.container__textContent}>
                        <h2>
                            Read the best crypto stories of the day in less than
                            5 minutes.
                        </h2>
                        <p>Subscribe to get it daily in your inbox</p>
                    </div>
                    <form
                        className={styles.container__submitSection}
                        action={formAction}
                    >
                        <div className={styles.container__input}>
                            <Input
                                type="string"
                                variant={'underlined'}
                                label="Fullname"
                                placeholder="Enter your full name"
                                isRequired
                                id="fullName"
                                name="fullName"
                            />
                            <Input
                                type="email"
                                variant={'underlined'}
                                label="Email"
                                placeholder="Enter your email"
                                isRequired
                                id="email"
                                name="email"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="solid"
                            color="danger"
                            isDisabled={pending}
                        >
                            {pending ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </div>
            </CardBody>
        </Card>
    );
}
