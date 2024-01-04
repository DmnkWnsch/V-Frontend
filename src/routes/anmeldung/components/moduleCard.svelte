<script>
// @ts-nocheck

    import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Row } from "sveltestrap";

    export let type;
    export let credits;
</script>

<Card>
    <CardHeader>
        {#if type == 'WRITTEN'}
            <CardTitle>Schriftliche Prüfung</CardTitle>
        {:else if type == 'ORAL'}
        <CardTitle>Mündliche Prüfung Prüfung</CardTitle>
        {:else}
            <CardTitle>Prüfungsvorleistung</CardTitle>
        {/if}
    </CardHeader>
    <CardBody>
        <Row> 
            <Col>
                <Row cols={{lg:2,md:4,sm:1}}>
                    {#if type != 'TASKS'}
                        <Col><f>Datum</f></Col>
                        <Col>07.02.2023</Col>
                    {:else}
                        <Col><f>Anmeldezeitraum</f></Col>
                        <Col>11.12.2023-22.12.2023</Col>
                    {/if}
                    <Col><f>Prüfungsart</f></Col>
                    {#if type == 'WRITTEN'}
                        <Col>schriftlich</Col>
                    {:else if type =='ORAL'}
                        <Col>mündlich</Col>
                    {:else}
                        <Col>Abgabe von Übungsaufgaben</Col>
                    {/if}
                    {#if type != 'TASKS'}
                        <Col><f>Leistungspunkte</f></Col>
                        <Col>{credits}</Col>
                    {/if}
                    <Col><f>Status</f></Col>
                    <Col>nicht angemeldet</Col>
                </Row>
            </Col>
            <Col>
                <Row cols={{lg:2,md:2,sm:5}}>
                    <Col><f>Semester der Leistung</f></Col>
                    <Col>Wintersemester 2022</Col>
                    <Col><f>Prüfer</f></Col>
                    <Col>Max Mustermann, Hermann Mann, Christian Franz</Col>
                </Row>
            </Col>
            <Col xs="auto"> 
                <Container class="h-100 d-flex justify-content-center align-items-center">
                    <Button color='success'>Anmelden</Button>
                </Container>
            </Col>
        </Row>
    </CardBody>
</Card>
<br/>

<style>
	f{
		font-weight: bold;
	}

</style>